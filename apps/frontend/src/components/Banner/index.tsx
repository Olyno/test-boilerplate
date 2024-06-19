import { PropsWithChildren } from 'react';
import { BannerType, StyledBanner } from './styled';

export default function Banner(props: PropsWithChildren<{ type: BannerType }>) {
  return <StyledBanner type={props.type}>{props.children}</StyledBanner>;
}
