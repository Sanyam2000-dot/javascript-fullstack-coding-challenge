import { PropsWithChildren } from "react";

const Icon = ({ name }: PropsWithChildren<IconProps>) => (
  <span className={`icon icon-${name}`} />
);

export interface IconProps {
  name: string;
}

export default Icon;