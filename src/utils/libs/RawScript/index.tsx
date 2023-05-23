export const RawScript = ({ children }: any) => (
  <script
    dangerouslySetInnerHTML={{
      __html: children,
    }}
  />
);
