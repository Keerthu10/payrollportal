import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";

const LoaderContext = createContext();

const SHOW_DELAY_MS = 150; // don't show loader for fast requests
const MIN_VISIBLE_MS = 300; // once shown, stay visible at least this long (smoother, no snap)

export const LoaderProvider = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const countRef = useRef(0);
  const showTimerRef = useRef(null);
  const shownAtRef = useRef(null);

  const show = useCallback(() => {
    countRef.current += 1;
    if (countRef.current === 1) {
      showTimerRef.current = setTimeout(() => {
        shownAtRef.current = Date.now();
        setVisible(true);
      }, SHOW_DELAY_MS);
    }
  }, []);

  const hide = useCallback(() => {
    countRef.current = Math.max(0, countRef.current - 1);
    if (countRef.current === 0) {
      clearTimeout(showTimerRef.current);
      if (shownAtRef.current) {
        const elapsed = Date.now() - shownAtRef.current;
        const remaining = Math.max(0, MIN_VISIBLE_MS - elapsed);
        setTimeout(() => {
          setVisible(false);
          shownAtRef.current = null;
        }, remaining);
      } else {
        setVisible(false);
      }
    }
  }, []);

  useEffect(() => {
    window.showGlobalLoader = show;
    window.hideGlobalLoader = hide;
  }, [show, hide]);

  return (
    <LoaderContext.Provider
      value={{ loading: visible, setLoading: setVisible }}
    >
      {children}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => useContext(LoaderContext);
