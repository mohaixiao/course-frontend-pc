import { useRef } from "react";
// @ts-ignore
import BulletScreen, { StyledBullet } from "rc-bullets-ts";

function useScreen<T>() {
  const ref = useRef();
  ref.current = new BulletScreen(".screen", {
    duration: 20,
    pauseOnHover: false,
  });

  return ref;
}

export default useScreen;
