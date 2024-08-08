export function ListTravel() {
  return (
    <div className="box-list-travel">
      <div className="box-list-travel-title">
        <p>Destinos recomendados para sua viagem</p>
      </div>
      <div className="container-list-travel">
        <div
          className="list-travel-image-1 row-list-travel"
          style={{
            background: `linear-gradient(180deg, rgba(58, 56, 56, 0.7) 0%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.7) 100%),
            url('/assets/home-pos-lancamento/list-travel-image-1.png')`,
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <span>
            <span className="icon-target"></span>Match: 98%
          </span>
          <div className="footer-item-travel primary">
            <span className="item-travel-list-title">Ouro Preto</span>
            <span className="item-travel-list-subtitle">Para 2 pessoas</span>
            <span className="item-travel-list-price">R$3.437,00</span>
          </div>
        </div>
        <div className="row-list-travel">
          <div
            className="list-travel-image-2"
            style={{
              background: `linear-gradient(180deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.7) 100%),
              url('/assets/home-pos-lancamento/list-travel-image-2.png')`,
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <span>
              <span className="icon-target"></span>Match: 92%
            </span>
            <div className="footer-item-travel second">
              <span className="item-travel-list-title">Paraty</span>
              <span className="item-travel-list-price">R$3.937,00</span>
            </div>
          </div>
          <div
            className="list-travel-image-3"
            style={{
              background: `linear-gradient(180deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.7) 100%),
              url('/assets/home-pos-lancamento/list-travel-image-3.png')`,
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <span>
              <span className="icon-target"></span>Match: 88%
            </span>
            <div className="footer-item-travel second">
              <span className="item-travel-list-title">Petrópolis</span>
              <span className="item-travel-list-price">R$3.837,00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
