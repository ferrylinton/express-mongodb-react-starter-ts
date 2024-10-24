import { RequestInfo } from '@src/types/request-info';
import dayjs from 'dayjs';
import { FormattedDate, useIntl } from 'react-intl';

type Props = {
  index: number
  reqestInfo: RequestInfo
}

export const RequestInfoItem = ({ index, reqestInfo }: Props) => {

  const intl = useIntl();

  return (
    <tr>
      <td data-label="#">{index}</td>
      <td data-label={intl.formatMessage({ id: "createdAt" })}>
        {dayjs(reqestInfo.createdAt).format("DD-MM-YYYY HH:mm:ss")}
      </td>
      <td data-label={intl.formatMessage({ id: "app" })}>{reqestInfo.app}</td>
      <td data-label={intl.formatMessage({ id: "ip" })}>{reqestInfo.ip}</td>
      <td data-label={intl.formatMessage({ id: "userAgent" })}>{reqestInfo.userAgent}</td>
    </tr>
  )
}
