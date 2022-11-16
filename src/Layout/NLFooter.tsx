import { Button, Col, Row } from "antd";
import { Footer } from "antd/lib/layout/layout";
import { Link } from "react-router-dom";

export const NLFooter = () => {
  return (
    <Footer className="nl-footer">
      <Row justify="space-around" style={{ alignItems: "center" }} gutter={[0, 24]}>
        <Row gutter={[0, 24]} className="nl-footer__button-info-wrapper">
          <Col>
            <a href="https://forms.gle/izdem2cpHfYavU3a7" target="_blank" rel="noreferrer">
              <Button className="footer-button">Buy $GNCO</Button>
            </a>
          </Col>
          <Col>
            <Link to="/terms_of_service" className="paragraph-2u u-margin-right-small">
              Terms and Conditions
            </Link>
            <Link to="/privacy_policy" className="paragraph-2u">
              Privacy Policy
            </Link>
            <p className="paragraph-3b u-margin-top-small"> &copy; Newlife.io All Rights Reserved</p>
          </Col>
        </Row>
        <Row>
          <Col className="nl-footer__col-info-wrapper">
            <p>Q&A</p>
            <p className="paragraph-2u">
              <a target="_blank" href="https://newforum.community/" rel="noreferrer">
                New forum
              </a>
            </p>
            <p className="paragraph-2u">
              <a href="https://newlife.io/" target="_blank" rel="noreferrer">
                Newlife I/O
              </a>
            </p>

            <p className="paragraph-2u">
              <a href="https://t.me/joinchat/RhLwbuYJoHKJrDAZ" target="_blank" rel="noreferrer">
                Newgraph
              </a>
            </p>
            <p className="paragraph-2u">
              <a href="https://merch.newlife.ai/" target="_blank" rel="noreferrer">
                Merch
              </a>
            </p>
          </Col>
          <Col className="nl-footer__col-info-wrapper">
            <p>Social Media</p>
            <p className="paragraph-2u">
              <a target="_blank" href="https://twitter.com/newlifeio" rel="noreferrer">
                Newlife Twitter
              </a>
            </p>
            <p className="paragraph-2u">
              <a target="_blank" href="https://instagram.com/newcoin.nco" rel="noreferrer">
                Newlife Instagram
              </a>
            </p>
            <p className="paragraph-2u">
              <a href="https://t.me/newcoinprotocol" target="_blank" rel="noreferrer">
                Newlife Telegram
              </a>
            </p>
            <p className="paragraph-2u">
              <a target="_blank" href="https://medium.com/@newlife.ai" rel="noreferrer">
                Newlife Medium
              </a>
            </p>
          </Col>
          <Col className="nl-footer__col-info-wrapper">
            <p>Resources</p>
            <p className="paragraph-2u">
              <a
                href="https://www.notion.so/newlifeio/How-To-Newlife-IO-3ce3ba69f2704144a8e0c69b521c18d3"
                target="_blank"
                rel="noreferrer"
              >
                Guide
              </a>
            </p>
            <p>
              <Row align="middle" className="paragraph-2u">
                <p className="paragraph-2u u-margin-right-xs">
                  <a href="https://t.me/joinchat/Ezz_sQzaOK2j977siawwGQ" target="_blank" rel="noreferrer">
                    Support
                  </a>
                </p>
                /
                <p className="paragraph-2u u-margin-left-xs">
                  <a href="https://discord.com/invite/2K8tvVh8tM" target="_blank" rel="noreferrer">
                    Discord
                  </a>
                </p>
              </Row>
            </p>
            <p className="paragraph-2u">
              <a target="_blank">Info Centre</a>
            </p>
            <p className="paragraph-2u">
              <Link to="/terms_of_service">Services Policy</Link>
            </p>
          </Col>
        </Row>
      </Row>
    </Footer>
  );
};
