
import { css, cx } from '@emotion/css';

import { SectionBase as MarsSectionBase } from 'mars-ds';
import { SectionBaseProps } from './section-base.types';

export const SectionBase = ({ className, sx, ...props }: SectionBaseProps) => {

  return (
    <MarsSectionBase className={cx(css(sx), className)} {...props} />
  );
};
