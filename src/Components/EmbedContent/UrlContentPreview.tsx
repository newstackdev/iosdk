import { NLView } from "../../types";
import Card from "antd/lib/card";

const { Meta } = Card;

export const UrlContentPreview: NLView<{
  title?: string;
  imgSrc?: string;
  description?: string;
  redirectUrl: string;
}> = ({ title, imgSrc, redirectUrl, description }) => {
  return (
    <a href={redirectUrl} target="_blank" rel="noreferrer">
      <Card hoverable className="url-preview-content-card" cover={imgSrc && <img src={imgSrc} alt={imgSrc} />}>
        <Meta title={title} description={description} className="header-4" />
      </Card>
    </a>
  );
};
