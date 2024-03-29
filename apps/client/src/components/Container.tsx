const Container = ({
  children,
  bg,
}: {
  children: React.ReactNode;
  bg: string;
}) => {
  return (
    <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${bg}`}>
      {children}
    </div>
  );
};
export default Container;
