'use client'

import { useState } from 'react'
import Image from 'next/image'
import Button from '@/components/common/Button'
import { Map, MapMarker } from '@/components/maps'

export default function BergenPortPlaybook() {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false)
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null)

  // Bergen attractions markers
  const bergenMarkers: MapMarker[] = [
    {
      id: '1',
      position: { lat: 60.3913, lng: 5.3221 },
      title: 'Bryggen Wharf',
      info: 'Historic Hanseatic wharf and UNESCO World Heritage site. Colorful wooden houses from the 14th century.'
    },
    {
      id: '2',
      position: { lat: 60.3971, lng: 5.3247 },
      title: 'Fløibanen Funicular',
      info: 'Cable car to Mount Fløyen with panoramic views at 320m height. Best views of Bergen and the fjords.'
    },
    {
      id: '3',
      position: { lat: 60.3948, lng: 5.3254 },
      title: 'Fish Market (Fisketorget)',
      info: 'Famous outdoor fish market with fresh local seafood and traditional Norwegian products.'
    },
    {
      id: '4',
      position: { lat: 60.3935, lng: 5.3238 },
      title: 'Bryggeloftet Restaurant',
      info: 'Traditional Norwegian restaurant serving authentic local dishes in a historic setting.'
    },
    {
      id: '5',
      position: { lat: 60.3952, lng: 5.3241 },
      title: 'Bergenhus Port',
      info: 'Main cruise port where ships dock. Starting point for your Bergen adventure.'
    }
  ]

  const handleMarkerClick = (marker: MapMarker) => {
    setSelectedMarker(marker)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-secondary-900 to-secondary-700 text-white">
        <div className="absolute inset-0">
          <Image
            src="/assets/home/cruzeiros/bergen-hero.jpg"
            alt="Bergen, Noruega - Port Playbook"
            fill
            className="object-cover opacity-30"
          />
        </div>
        <div className="relative z-10 w-full md:w-[80%] mx-auto px-4 md:px-0">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6">
              <span className="bg-accent-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                Port Playbook
              </span>
            </div>
            <h1 className="font-baloo text-4xl md:text-6xl font-bold mb-6">
              3 horas em <span className="text-accent-500">Bergen</span>: a rota sem estresse que a maioria dos casais perde
            </h1>
            <p className="font-comfortaa text-xl md:text-2xl mb-8 text-white/90">
              O guia definitivo para aproveitar ao máximo seu dia em Bergen, Noruega - sem perder tempo ou dinheiro
            </p>
            <Button
              onClick={() => setIsLeadModalOpen(true)}
              className="font-baloo bg-accent-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
            >
              Quero o PDF completo + minhas datas
            </Button>
          </div>
        </div>
      </section>

      {/* Snapshot Section */}
      <section className="py-16 bg-secondary-50">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-baloo text-3xl font-bold text-secondary-900 mb-8 text-center">
              Snapshot: Bergen em 3 Horas
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="font-baloo text-xl font-bold text-secondary-900 mb-4">
                  🎯 Melhor para
                </h3>
                <p className="text-secondary-600 font-comfortaa">
                  Casais que buscam paisagens deslumbrantes, história medieval e gastronomia local autêntica.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="font-baloo text-xl font-bold text-secondary-900 mb-4">
                  ⏰ Janela ideal
                </h3>
                <p className="text-secondary-600 font-comfortaa">
                  09:00-12:00 (menos turistas) ou 14:00-17:00 (melhor luz para fotos). Evite 11:00-13:00 (hora do almoço).
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="font-baloo text-xl font-bold text-secondary-900 mb-4">
                  ✅ Faça isso
                </h3>
                <ul className="text-secondary-600 font-comfortaa space-y-2">
                  <li>• Visite Bryggen (patrimônio UNESCO) cedo</li>
                  <li>• Suba o funicular Fløibanen para vistas panorâmicas</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="font-baloo text-xl font-bold text-secondary-900 mb-4">
                  ❌ Evite isso
                </h3>
                <ul className="text-secondary-600 font-comfortaa space-y-2">
                  <li>• Restaurantes turísticos na frente do porto</li>
                  <li>• Comprar souvenirs nas lojas centrais</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Plan Section */}
      <section className="py-16 bg-white">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-baloo text-3xl font-bold text-secondary-900 mb-8 text-center">
              Plano Principal: Rota Perfeita
            </h2>
            
            <div className="space-y-8">
              {/* Timeline */}
              <div className="bg-gradient-to-r from-accent-50 to-accent-100 p-8 rounded-2xl">
                <h3 className="font-baloo text-2xl font-bold text-secondary-900 mb-6">
                  ⏱️ Timeline Detalhado
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-bold min-w-[60px] text-center">
                      09:00
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary-900">Desembarque + Bryggen</h4>
                      <p className="text-secondary-600 text-sm">15 min caminhada do porto. Fotos sem multidão.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-bold min-w-[60px] text-center">
                      09:30
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary-900">Funicular Fløibanen</h4>
                      <p className="text-secondary-600 text-sm">Subida 6 min. Vistas de 320m de altura.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-bold min-w-[60px] text-center">
                      10:00
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary-900">Café no Monte Fløyen</h4>
                      <p className="text-secondary-600 text-sm">Fløistuen Café - waffles noruegueses.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-bold min-w-[60px] text-center">
                      10:45
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary-900">Descida + Mercado</h4>
                      <p className="text-secondary-600 text-sm">Mercado de peixes local (Fisketorget).</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-bold min-w-[60px] text-center">
                      11:30
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary-900">Almoço Local</h4>
                      <p className="text-secondary-600 text-sm">Bryggeloftet - pratos tradicionais noruegueses.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-bold min-w-[60px] text-center">
                      12:30
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary-900">Retorno ao Navio</h4>
                      <p className="text-secondary-600 text-sm">Buffer de 30 min para imprevistos.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Anchor Moment */}
              <div className="bg-secondary-50 p-8 rounded-2xl">
                <h3 className="font-baloo text-2xl font-bold text-secondary-900 mb-4">
                  🎯 O Momento Essencial
                </h3>
                <p className="text-secondary-600 font-comfortaa text-lg leading-relaxed">
                  <strong>Vista do Monte Fløyen às 10:00</strong> - Este é o momento que você se arrependeria de perder. 
                  A vista panorâmica de Bergen, dos fiordes e das ilhas é simplesmente deslumbrante. 
                  Chegue cedo para evitar filas e ter a plataforma de observação só para vocês.
                </p>
              </div>

              {/* Interactive Map */}
              <div className="bg-white border-2 border-accent-200 p-8 rounded-2xl">
                <h3 className="font-baloo text-2xl font-bold text-secondary-900 mb-6">
                  🗺️ Mapa Interativo - Rota de Bergen
                </h3>
                <p className="text-secondary-600 font-comfortaa mb-6">
                  Clique nos marcadores para ver informações detalhadas sobre cada ponto da sua rota.
                </p>
                
                <div className="mb-6">
                  <Map
                    apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}
                    center={{ lat: 60.3913, lng: 5.3221 }} // Bergen center
                    zoom={15}
                    markers={bergenMarkers}
                    height="400px"
                    width="100%"
                    className="rounded-lg shadow-lg"
                    onMarkerClick={handleMarkerClick}
                    showControls={true}
                    loadingComponent={
                      <div className="flex items-center justify-center h-full bg-gray-100 rounded-lg">
                        <div className="text-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-500 mx-auto mb-2"></div>
                          <p className="text-gray-600">Carregando mapa...</p>
                        </div>
                      </div>
                    }
                    errorComponent={
                      <div className="flex items-center justify-center h-full bg-red-50 rounded-lg">
                        <div className="text-center">
                          <p className="text-red-600 font-medium">Erro ao carregar mapa</p>
                          <p className="text-red-500 text-sm">Verifique sua chave da API</p>
                        </div>
                      </div>
                    }
                  />
                </div>

                {selectedMarker && (
                  <div className="bg-accent-50 p-6 rounded-xl">
                    <h4 className="font-baloo text-xl font-bold text-secondary-900 mb-3">
                      📍 {selectedMarker.title}
                    </h4>
                    <p className="text-secondary-700 font-comfortaa mb-3">
                      {selectedMarker.info}
                    </p>
                    <p className="text-accent-600 text-sm font-semibold">
                      Coordenadas: {selectedMarker.position.lat.toFixed(4)}, {selectedMarker.position.lng.toFixed(4)}
                    </p>
                  </div>
                )}

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-secondary-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-secondary-900 mb-2">🎯 Dicas de Navegação</h4>
                    <ul className="text-secondary-600 text-sm space-y-1">
                      <li>• Comece no porto (marcador azul)</li>
                      <li>• Siga para Bryggen (15 min a pé)</li>
                      <li>• Suba o funicular para vistas panorâmicas</li>
                      <li>• Termine no mercado de peixes</li>
                    </ul>
                  </div>
                  <div className="bg-secondary-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-secondary-900 mb-2">⏰ Tempos Estimados</h4>
                    <ul className="text-secondary-600 text-sm space-y-1">
                      <li>• Porto → Bryggen: 15 min</li>
                      <li>• Bryggen → Funicular: 5 min</li>
                      <li>• Funicular → Mercado: 10 min</li>
                      <li>• Total da rota: 3 horas</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Backup Plans Section */}
      <section className="py-16 bg-secondary-50">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-baloo text-3xl font-bold text-secondary-900 mb-8 text-center">
              Planos de Contingência
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Backup A - Weather */}
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h3 className="font-baloo text-2xl font-bold text-secondary-900 mb-4">
                  🌧️ Plano B: Clima Ruim
                </h3>
                <p className="text-secondary-600 font-comfortaa mb-4">
                  Se chover ou neblina &gt; 20 min, pule o funicular e vá direto para:
                </p>
                <ul className="text-secondary-600 font-comfortaa space-y-2">
                  <li>• <strong>Museu Hanseático</strong> - história medieval (1h)</li>
                  <li>• <strong>Aquário de Bergen</strong> - vida marinha norueguesa (1h)</li>
                  <li>• <strong>Centro Comercial Galleriet</strong> - compras e café (45 min)</li>
                </ul>
              </div>
              
              {/* Backup B - Time Crunch */}
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h3 className="font-baloo text-2xl font-bold text-secondary-900 mb-4">
                  ⏰ Plano C: Tempo Limitado
                </h3>
                <p className="text-secondary-600 font-comfortaa mb-4">
                  Se navio partir antes das 17:00, corte o almoço e faça:
                </p>
                <ul className="text-secondary-600 font-comfortaa space-y-2">
                  <li>• <strong>Bryggen</strong> (15 min) - fotos rápidas</li>
                  <li>• <strong>Funicular</strong> (30 min) - vista essencial</li>
                  <li>• <strong>Sandwich</strong> no navio - economize tempo</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Local Intel Section */}
      <section className="py-16 bg-white">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-baloo text-3xl font-bold text-secondary-900 mb-8 text-center">
              Intel Local: Dicas de Concierge
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-accent-50 p-6 rounded-xl">
                  <h3 className="font-baloo text-xl font-bold text-secondary-900 mb-3">
                    📅 Reservas
                  </h3>
                  <p className="text-secondary-600 font-comfortaa text-sm">
                    <strong>Bryggeloftet:</strong> Reserve 1 dia antes para almoço. Tel: +47 55 30 20 70
                  </p>
                </div>
                
                <div className="bg-accent-50 p-6 rounded-xl">
                  <h3 className="font-baloo text-xl font-bold text-secondary-900 mb-3">
                    💰 Pagamentos
                  </h3>
                  <p className="text-secondary-600 font-comfortaa text-sm">
                    Cartões aceitos em todos os lugares. Gorjetas não são esperadas na Noruega.
                  </p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-accent-50 p-6 rounded-xl">
                  <h3 className="font-baloo text-xl font-bold text-secondary-900 mb-3">
                    ⏰ Horários
                  </h3>
                  <p className="text-secondary-600 font-comfortaa text-sm">
                    <strong>Funicular:</strong> 07:30-23:00 (mais frequente 08:00-18:00)<br/>
                    <strong>Mercado:</strong> 07:00-15:00 (fechado domingos)
                  </p>
                </div>
                
                <div className="bg-accent-50 p-6 rounded-xl">
                  <h3 className="font-baloo text-xl font-bold text-secondary-900 mb-3">
                    ❌ O que pular
                  </h3>
                  <p className="text-secondary-600 font-comfortaa text-sm">
                    • Restaurantes turísticos na frente do porto<br/>
                    • Lojas de souvenirs centrais (preços altos)<br/>
                    • Museus menores (foco no essencial)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Logistics Section */}
      <section className="py-16 bg-secondary-50">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-baloo text-3xl font-bold text-secondary-900 mb-8 text-center">
              📋 Logística Rápida
            </h2>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-baloo text-xl font-bold text-secondary-900 mb-4">
                    🚢 Do Porto
                  </h3>
                  <ul className="text-secondary-600 font-comfortaa space-y-2 text-sm">
                    <li><strong>Dock:</strong> Bergenhus Port (centro da cidade)</li>
                    <li><strong>Tender:</strong> 10 min (se necessário)</li>
                    <li><strong>Shuttle:</strong> Gratuito para centro (5 min)</li>
                    <li><strong>Distância:</strong> 15 min a pé para Bryggen</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-baloo text-xl font-bold text-secondary-900 mb-4">
                    🚽 Pontos de Referência
                  </h3>
                  <ul className="text-secondary-600 font-comfortaa space-y-2 text-sm">
                    <li><strong>Banheiros:</strong> Centro comercial Galleriet (gratuito)</li>
                    <li><strong>WiFi:</strong> Biblioteca pública (gratuito)</li>
                    <li><strong>Encontro:</strong> Estátua de Ole Bull (centro)</li>
                    <li><strong>Emergência:</strong> +47 113 (polícia)</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-accent-50 rounded-xl">
                <h3 className="font-baloo text-lg font-bold text-secondary-900 mb-3">
                  ⚡ Buffer de Segurança
                </h3>
                <p className="text-secondary-600 font-comfortaa text-sm">
                  <strong>Retorno:</strong> 30 min antes do horário de embarque<br/>
                  <strong>Imprevistos:</strong> 15 min extras para fotos/exploração<br/>
                  <strong>Chuva:</strong> 20 min extras para deslocamentos
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Itinerary Matches Section */}
      <section className="py-16 bg-white">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-baloo text-3xl font-bold text-secondary-900 mb-8">
              🚢 Cruzeiros que Visitam Bergen
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-secondary-50 p-6 rounded-xl">
                <h3 className="font-baloo text-lg font-bold text-secondary-900 mb-2">
                  Celebrity Apex
                </h3>
                <p className="text-secondary-600 font-comfortaa text-sm">
                  Maio - Setembro<br/>
                  Fiordes Noruegueses
                </p>
              </div>
              
              <div className="bg-secondary-50 p-6 rounded-xl">
                <h3 className="font-baloo text-lg font-bold text-secondary-900 mb-2">
                  Azamara Quest
                </h3>
                <p className="text-secondary-600 font-comfortaa text-sm">
                  Junho - Agosto<br/>
                  Costa Norueguesa
                </p>
              </div>
              
              <div className="bg-secondary-50 p-6 rounded-xl">
                <h3 className="font-baloo text-lg font-bold text-secondary-900 mb-2">
                  Crystal Symphony
                </h3>
                <p className="text-secondary-600 font-comfortaa text-sm">
                  Julho - Agosto<br/>
                  Mar Báltico
                </p>
              </div>
            </div>
            
            <div className="bg-accent-50 p-8 rounded-2xl">
              <h3 className="font-baloo text-2xl font-bold text-secondary-900 mb-4">
                Quer este plano personalizado para suas datas?
              </h3>
              <p className="text-secondary-600 font-comfortaa text-lg mb-6">
                Responda &quot;BERGEN&quot; com seu mês e eu adapto este roteiro para sua janela exata de desembarque.
              </p>
              <Button
                onClick={() => setIsLeadModalOpen(true)}
                className="font-baloo bg-accent-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
              >
                Quero o PDF + minhas datas mapeadas
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-secondary-900 text-white">
        <div className="w-full md:w-[80%] mx-auto px-4 md:px-0 text-center">
          <h2 className="font-baloo text-3xl md:text-4xl font-bold mb-6">
            Pronto para sua <span className="text-accent-500">aventura em Bergen?</span>
          </h2>
          <p className="text-white/90 font-comfortaa text-lg mb-8 max-w-2xl mx-auto">
            Quer a versão impressa + suas datas mapeadas? Responda &quot;BERGEN&quot; e eu envio no WhatsApp.
          </p>
          <Button
            onClick={() => setIsLeadModalOpen(true)}
            className="font-baloo bg-accent-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
          >
            Quero o PDF completo + minhas datas
          </Button>
        </div>
      </section>

      {/* Lead Modal would go here */}
      {isLeadModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 md:p-8">
            <div className="text-center mb-6">
              <h2 className="font-baloo text-2xl md:text-3xl font-bold text-secondary-900 mb-4">
                Receba seu Port Playbook
              </h2>
              <p className="text-secondary-600 font-comfortaa mb-4">
                Envie suas informações e receba o PDF completo + suas datas personalizadas no WhatsApp.
              </p>
            </div>
            
            <form className="space-y-4">
              <div>
                <label className="block text-secondary-900 font-semibold mb-2">Nome</label>
                <input
                  type="text"
                  className="w-full p-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                  placeholder="Seu nome completo"
                />
              </div>
              <div>
                <label className="block text-secondary-900 font-semibold mb-2">WhatsApp</label>
                <input
                  type="tel"
                  className="w-full p-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                  placeholder="(11) 99999-9999"
                />
              </div>
              <div>
                <label className="block text-secondary-900 font-semibold mb-2">Mês da viagem</label>
                <select className="w-full p-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent">
                  <option>Selecione o mês</option>
                  <option>Maio 2024</option>
                  <option>Junho 2024</option>
                  <option>Julho 2024</option>
                  <option>Agosto 2024</option>
                  <option>Setembro 2024</option>
                </select>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsLeadModalOpen(false)}
                  className="flex-1 font-baloo bg-gray-300 text-gray-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-400 transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 font-baloo bg-accent-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-accent-600 transition-all"
                >
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
