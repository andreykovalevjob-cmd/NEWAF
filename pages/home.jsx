// home.jsx — выбирает <HomeDesktop> или <HomeMobile> по ширине окна.
// Контент обеих версий — в home-desktop.jsx и home-mobile.jsx,
// шапка/футер прилетают из components/header.jsx и components/footer.jsx.

const useIsMobileRouter = (bp = 720) => {
  const [m, setM] = React.useState(() =>
    typeof window !== 'undefined' && window.innerWidth < bp
  );
  React.useEffect(() => {
    const on = () => setM(window.innerWidth < bp);
    window.addEventListener('resize', on);
    window.addEventListener('orientationchange', on);
    return () => {
      window.removeEventListener('resize', on);
      window.removeEventListener('orientationchange', on);
    };
  }, [bp]);
  return m;
};

window.HomePage = function HomePage() {
  const isMobile = useIsMobileRouter(720);
  return isMobile
    ? <window.HomeMobile />
    : <window.HomeDesktop />;
};
