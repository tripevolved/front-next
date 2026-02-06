"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { differenceInMinutes } from "date-fns";
import type { PagamentoStepProps } from "@/core/types/payments";
import { copyToClipboard } from "@/utils/helpers/strings.helper";
import { PaymentsApiService } from "@/clients/payments";

async function fetchClientIp(): Promise<string> {
  try {
    const res = await fetch("https://api.ipify.org?format=json");
    const data = await res.json();
    return data.ip ?? "";
  } catch {
    return "";
  }
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function PixPaymentContent({
  qrCode,
  netAmount,
  expirationDate,
}: {
  qrCode: string;
  netAmount: number;
  expirationDate: Date | string;
}) {
  const [copied, setCopied] = useState(false);
  const expDate = typeof expirationDate === "string" ? new Date(expirationDate) : expirationDate;
  const minutesLeft = differenceInMinutes(expDate, new Date());

  const handleCopy = () => {
    copyToClipboard(qrCode, "Código PIX copiado!");
    setCopied(true);
  };

  return (
    <div className="space-y-6">
      <p className="font-comfortaa text-secondary-700">
        Escaneie o QR Code com o app do seu banco para pagar com PIX. O pagamento será processado pela ValePay, nossa parceira de pagamentos.
      </p>
      <div className="flex flex-col items-center gap-4 p-6 bg-secondary-50 rounded-xl border border-secondary-200">
        <QRCodeSVG value={qrCode} size={200} className="m-auto" />
        <p className="font-comfortaa text-secondary-900 font-semibold">
          Valor: {formatCurrency(netAmount)}
        </p>
        <button
          type="button"
          onClick={handleCopy}
          className="font-comfortaa px-4 py-2 border border-secondary-200 rounded-lg text-secondary-700 hover:bg-secondary-100 transition-colors"
        >
          {copied ? "Copiado!" : "Copiar código PIX"}
        </button>
        {minutesLeft > 0 && (
          <p className="font-comfortaa text-sm text-secondary-500">
            Expira em {minutesLeft} {minutesLeft === 1 ? "minuto" : "minutos"}
          </p>
        )}
      </div>
      <div className="flex items-center justify-center gap-2 pt-2">
        <span className="font-comfortaa text-sm text-secondary-500">
          Compra segura • Transação protegida
        </span>
      </div>
    </div>
  );
}

const INPUT_CLASS =
  "w-full px-3 py-2 border border-secondary-200 rounded-lg font-comfortaa text-secondary-900 focus:ring-2 focus:ring-accent-500 focus:border-accent-500";

export function StepPaymentFinish({
  payload,
  setPayload,
  onNext,
  onBack,
  isSaving,
  paymentIntentResponse,
}: PagamentoStepProps) {
  const isPix = payload.paymentMethod === "pix";
  const pixInfo = isPix ? paymentIntentResponse?.pixInfo : null;

  const [cardData, setCardData] = useState({
    name: "",
    cardNumber: "",
    securityCode: "",
    expirationMonth: "",
    expirationYear: "",
  });
  const [cardSubmitting, setCardSubmitting] = useState(false);
  const [cardSuccess, setCardSuccess] = useState(false);
  const [cardError, setCardError] = useState<string | null>(null);

  const handleCreditCardSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const transactionId = paymentIntentResponse?.transactionId;
      if (!transactionId) {
        setCardError("Transação não encontrada. Volte e tente novamente.");
        return;
      }
      const cardNumber = cardData.cardNumber.replace(/\D/g, "");
      if (!cardNumber || !cardData.name || !cardData.securityCode || !cardData.expirationMonth || !cardData.expirationYear) {
        setCardError("Preencha todos os campos do cartão.");
        return;
      }
      setCardError(null);
      setCardSubmitting(true);
      try {
        const { token, paymentMethodId } = await PaymentsApiService.postIntentCard(
          transactionId,
          cardNumber
        );
        const ipAddress = await fetchClientIp();
        const month = parseInt(cardData.expirationMonth, 10);
        const year = parseInt(cardData.expirationYear, 10);
        const finishRes = await PaymentsApiService.postIntentFinish({
          transactionId,
          name: cardData.name,
          cardToken: token,
          securityCode: cardData.securityCode,
          expirationMonth: month,
          expirationYear: year,
          ipAddress,
          paymentMethodId,
        });
        if (finishRes.isSuccess) {
          setCardSuccess(true);
        } else {
          setCardError(finishRes.message ?? "Erro ao processar o pagamento.");
        }
      } catch (err) {
        setCardError(err instanceof Error ? err.message : "Erro ao processar o pagamento.");
      } finally {
        setCardSubmitting(false);
      }
    },
    [paymentIntentResponse?.transactionId, cardData]
  );

  const updateCardData = (field: keyof typeof cardData, value: string) => {
    setCardData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <section className="bg-white rounded-2xl border border-secondary-200 p-6 md:p-8 shadow-sm">

      {isPix && pixInfo && (
        <div className="mb-8">
          <PixPaymentContent
            qrCode={pixInfo.qrCode}
            netAmount={pixInfo.netAmount}
            expirationDate={pixInfo.expirationDate}
          />
        </div>
      )}

      {!isPix && cardSuccess && (
        <div className="space-y-6 mb-8">
          <div className="p-6 bg-green-50 border border-green-200 rounded-xl">
            <p className="font-comfortaa text-green-800 font-medium">
              Pagamento realizado com sucesso!
            </p>
            <p className="font-comfortaa text-green-700 text-sm mt-2">
              Obrigado pela sua compra. Você receberá a confirmação por e-mail.
            </p>
          </div>
          <Link
            href="/app"
            className="inline-block font-baloo bg-accent-500 text-secondary-900 px-6 py-3 rounded-full font-semibold hover:bg-accent-600 transition-colors text-center"
          >
            Voltar ao app
          </Link>
        </div>
      )}

      {!isPix && !cardSuccess && (
        <form onSubmit={handleCreditCardSubmit} className="space-y-4">
          {cardError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg font-comfortaa text-red-700 text-sm">
              {cardError}
            </div>
          )}
          <div>
            <label htmlFor="cardName" className="block font-comfortaa text-sm font-medium text-secondary-700 mb-1">
              Nome no cartão
            </label>
            <input
              id="cardName"
              type="text"
              required
              value={cardData.name}
              onChange={(e) => updateCardData("name", e.target.value)}
              className={INPUT_CLASS}
              placeholder="Nome como está no cartão"
            />
          </div>
          <div>
            <label htmlFor="cardNumber" className="block font-comfortaa text-sm font-medium text-secondary-700 mb-1">
              Número do cartão
            </label>
            <input
              id="cardNumber"
              type="text"
              inputMode="numeric"
              required
              value={cardData.cardNumber}
              onChange={(e) => updateCardData("cardNumber", e.target.value.replace(/\D/g, "").slice(0, 16))}
              className={INPUT_CLASS}
              placeholder="0000 0000 0000 0000"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="expMonth" className="block font-comfortaa text-sm font-medium text-secondary-700 mb-1">
                Validade (mês)
              </label>
              <input
                id="expMonth"
                type="text"
                inputMode="numeric"
                required
                value={cardData.expirationMonth}
                onChange={(e) => updateCardData("expirationMonth", e.target.value.replace(/\D/g, "").slice(0, 2))}
                className={INPUT_CLASS}
                placeholder="MM"
              />
            </div>
            <div>
              <label htmlFor="expYear" className="block font-comfortaa text-sm font-medium text-secondary-700 mb-1">
                Validade (ano)
              </label>
              <input
                id="expYear"
                type="text"
                inputMode="numeric"
                required
                value={cardData.expirationYear}
                onChange={(e) => updateCardData("expirationYear", e.target.value.replace(/\D/g, "").slice(0, 2))}
                className={INPUT_CLASS}
                placeholder="AA"
              />
            </div>
          </div>
          <div>
            <label htmlFor="cvv" className="block font-comfortaa text-sm font-medium text-secondary-700 mb-1">
              CVV
            </label>
            <input
              id="cvv"
              type="text"
              inputMode="numeric"
              required
              value={cardData.securityCode}
              onChange={(e) => updateCardData("securityCode", e.target.value.replace(/\D/g, "").slice(0, 4))}
              className={INPUT_CLASS}
              placeholder="123"
            />
            <p className="font-comfortaa text-xs text-secondary-500 mt-1">
              Os 3 ou 4 dígitos no verso do cartão
            </p>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={payload.acceptTerms ?? false}
              onChange={(e) => setPayload({ acceptTerms: e.target.checked })}
              className="w-4 h-4 text-accent-500 border-secondary-300 rounded focus:ring-accent-500"
            />
            <span className="font-comfortaa text-sm text-secondary-700">
              Li e aceito os termos e condições do pagamento.
            </span>
          </label>
          <div className="flex gap-3 pt-4">
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                className="font-comfortaa px-4 py-2 text-secondary-700 hover:bg-secondary-100 rounded-lg transition-colors"
              >
                Voltar
              </button>
            )}
            <button
              type="submit"
              disabled={cardSubmitting || !(payload.acceptTerms ?? false)}
              className="font-baloo bg-accent-500 text-secondary-900 px-6 py-2 rounded-full font-semibold hover:bg-accent-600 disabled:opacity-60 transition-all"
            >
              {cardSubmitting ? "Processando…" : "Confirmar e pagar"}
            </button>
          </div>
          <p className="font-comfortaa text-sm text-secondary-500">
            Compra segura • Transação protegida junto à nossa parceira ValePay
          </p>
        </form>
      )}

      {isPix && pixInfo && onBack && (
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onBack}
            className="font-comfortaa px-4 py-2 text-secondary-700 hover:bg-secondary-100 rounded-lg transition-colors"
          >
            Voltar
          </button>
        </div>
      )}
    </section>
  );
}
