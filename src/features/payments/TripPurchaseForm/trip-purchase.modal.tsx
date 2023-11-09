import { PaymentsApiService } from "@/services/api";
import { LoaderState, ModalContent } from "@/ui";
import { delay } from "@/utils/helpers/async.helpers";
import { Modal, Notification } from "mars-ds";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

const POOLING_INTERVAL = 10000; // 10 seconds
const POOLING_RETRIES = 60 * 3; // 3 minutes

const DEFAULT_MESSAGES = {
  ERROR: "Devido à um erro, seu pagamento não foi processado",
  SUCCESS: "Seu pagamento foi realizado com sucesso!",
};

const PurchaseModal = () => {
  return (
    <ModalContent>
      <LoaderState
        heading="Aguarde o enquanto processamos o seu pagamento"
        text="Esse procedimento pode demorar alguns minutos."
      />
    </ModalContent>
  );
};

const processPayment = async (tripId: string, retry = POOLING_RETRIES): Promise<void> => {
  const { error, finish, message } = await PaymentsApiService.getTripPaymentStatus(tripId);

  if ((finish && error) || retry === 0) {
    Notification.error(message || DEFAULT_MESSAGES.ERROR);
    throw new Error(message || DEFAULT_MESSAGES.ERROR);
  }
  if (finish) {
    Notification.success(message || DEFAULT_MESSAGES.SUCCESS);
    return;
  }

  await delay(POOLING_INTERVAL);
  return processPayment(tripId, retry - 1);
};

export const useAwaitPaymentProcess = (tripId: string) => {
  const router = useRouter();
  const modalRef = useRef<{ close: VoidFunction }>();

  const execute = async () => {
    modalRef.current = Modal.open(PurchaseModal, { closable: false });
    try {
      await processPayment(tripId);
      router.push(`/app/viagens/${tripId}`);
    } catch (error) {
      console.error(error);
    } finally {
      modalRef.current?.close();
    }
  };

  useEffect(() => {
    return () => {
      modalRef.current?.close();
    };
  }, []);

  return { execute };
};
