export const AutoScrollCards = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="auto-scroll-cards">
      <div className="auto-scroll-cards__content">
        {children}
      </div>
    </div>
  )
};
