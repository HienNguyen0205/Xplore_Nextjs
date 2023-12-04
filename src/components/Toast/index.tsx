import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  createContext,
} from "react";
import Image from "next/image";
import {
  toastItemProps,
  toastCOMProps,
  toastData,
  toastContextProps,
  toastConfig,
} from "@/utils/types";
import { generateRandomCode } from "@/utils/function";
import { animated, useTransition, useSpring } from "@react-spring/web";

const ToastContext = createContext<toastContextProps | undefined>(undefined);

const icon = {
  success: require("@/assets/images/Icon/tick.svg"),
  error: require("@/assets/images/Icon/cross.svg"),
  info: require("@/assets/images/Icon/info.svg"),
};

const ToastItem = (props: toastItemProps) => {
  const { content, status, duration, config, handleClose } = props;

  const handleTimeOut = useCallback(() => {
    setTimeout(() => {
      handleClose();
    }, duration);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration]);

  useEffect(() => {
    handleTimeOut();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration]);

  const timeBarAni = useSpring({
    from: {
      width: "0%",
    },
    to: {
      width: "100%",
    },
    config: {
      duration: duration,
    },
  });

  return (
    <div className="relative w-full my-2 bg-current rounded overflow-hidden">
      <Image
        className="absolute top-1 right-1 cursor-pointer"
        src={require("@/assets/images/Icon/cross-1.svg")}
        alt="icon"
        height={20}
        width={20}
        onClick={handleClose}
      />
      <div className="h-full py-2 ml-4 mr-6 flex items-center">
        <Image
          className="mr-4"
          src={icon[status]}
          alt="icon"
          width={24}
          height={24}
        />
        <p className="text-white flex-1">{content}</p>
      </div>
      <animated.div
        className="h-[4px] w-0 bg-green-600"
        style={timeBarAni}
      ></animated.div>
    </div>
  );
};

const ToastProvider: React.FC<toastCOMProps> = ({ children, ...props }) => {
  const [data, setData] = useState<toastData[]>([]);

  const { duration, limit } = props;

  const transition = useTransition(data, {
    from: {
      opacity: 0,
      transform: "translateX(50%)",
    },
    enter: {
      opacity: 1,
      transform: "translateX(0)",
    },
    leave: {
      opacity: 0,
    },
    config: {
      duration: 200,
    },
  });

  const delay = (fn: any, duration: number) => {
    setTimeout(fn, duration);
  };

  const setToast = (
    content: string,
    status: "success" | "error" | "info",
    config?: toastConfig
  ) => {
    const key = generateRandomCode(5);
    setData((prev) => {
      if (prev.length < limit) {
        return [...prev, { key, content, status, config }];
      } else {
        const temp = [...prev];
        temp.shift();
        return [...temp, { key, content, status, config }];
      }
    });
  };

  const success = useCallback(
    (content: string, config?: toastConfig) => {
      const status = "success";
      if (config?.delay) {
        delay(() => setToast(content, status, config), config.delay);
      } else {
        setToast(content, status, config);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const error = useCallback((content: string, config?: toastConfig) => {
    const status = "error";
    if (config?.delay) {
      delay(() => setToast(content, status, config), config.delay);
    } else {
      setToast(content, status, config);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const info = useCallback((content: string, config?: toastConfig) => {
    const status = "info";
    if (config?.delay) {
      delay(() => setToast(content, status, config), config.delay);
    } else {
      setToast(content, status, config);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = useCallback((key: string) => {
    setData((prev) => {
      const index = prev.findIndex((item) => item.key === key);
      if (index !== -1) {
        const temp = [...prev];
        temp.splice(index, 1);
        return temp;
      }
      return prev;
    });
  }, []);

  return (
    <ToastContext.Provider value={{ success, error, info, handleClose }}>
      <div className="fixed flex flex-col bottom-[1em] right-[1em] w-[320px] z-[999]">
        {transition((style, item) => (
          <animated.div style={style}>
            <ToastItem
              key={item.key}
              content={item.content}
              status={item.status}
              duration={duration}
              config={item.config}
              handleClose={() => handleClose(item.key)}
            />
          </animated.div>
        ))}
      </div>
      {children}
    </ToastContext.Provider>
  );
};

export default ToastProvider;

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("Error");
  }
  return context;
};
