const { CHAT_S3_BASE_URL } = require("../utils/helper");
exports.ET_04 = (name, attachments, para, subject, type, users, userEmail) => {
  const date = new Date();
  const year = date.getFullYear();
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
    <html lang="en">
      <head></head>
      <body
        style="
          background-color: #f3f3f5;
          font-family: HelveticaNeue, Helvetica, Arial, sans-serif;
        "
      >
        <table
          align="center"
          role="presentation"
          cellspacing="0"
          cellpadding="0"
          border="0"
          width="100%"
          style="
            max-width: 680px;
            width: 100%;
            margin: 0 auto;
            background-color: #ffffff;
          "
        >
          <tr style="width: 100%">
            <td>
              <table
                style="display: flex; background: #f3f3f5; padding: 20px 30px"
                align="center"
                border="0"
                cellpadding="0"
                cellspacing="0"
                role="presentation"
                width="100%"
              >
                <tbody>
                  <tr>
                    <td style="width: 6%">
                      <img
                        alt="ArchiveHub"
                        src="https://i.ibb.co/0jbNZFB/books.gif"
                        width="30"
                        height="24"
                        style="
                          display: block;
                          outline: none;
                          border: none;
                          text-decoration: none;
                        "
                      />
                    </td>
                    <td style="width: 6%">
                      <img
                        alt="ArchiveHub"
                        src="https://i.ibb.co/1qDstW5/logo.gif"
                        width="30"
                        height="24"
                        style="
                          display: block;
                          outline: none;
                          border: none;
                          text-decoration: none;
                        "
                      />
                    </td>
    
                    <td>
                      <table
                        width="100%"
                        align="center"
                        role="presentation"
                        cellspacing="0"
                        cellpadding="0"
                        border="0"
                      >
                        <tbody style="width: 100%">
                          <tr style="width: 100%">
                            <td>
                              <h1
                                style="
                                  display: inline;
                                  outline: none;
                                  border: none;
                                  text-decoration: none;
                                  margin-left: 5px;
                                  font-weight: 900;
                                "
                              >
                                ArchiveHub
                              </h1>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table
                width="100%"
                style="
                  border-radius: 5px 5px 0 0;
                  display: flex;
                  flex-direciont: column;
                  background-color: #2b2d6e;
                "
                align="center"
                role="presentation"
                cellspacing="0"
                cellpadding="0"
                border="0"
              >
                <tbody style="width: 100%">
                  <tr style="width: 100%">
                    <td style="padding: 20px 30px 15px">
                      <h1
                        style="
                          color: #fff;
                          font-size: 27px;
                          font-weight: bold;
                          line-height: 27px;
                        "
                      >
                        ${type === "receiver" ? name : "Preview Copy of Yours."}
                      </h1>
                      <p
                        style="
                          font-size: 17px;
                          line-height: 24px;
                          margin: 16px 0;
                          color: #fff;
                        "
                      >
                        ${subject}
                      </p>
                    </td>
                    <td style="padding: 30px 10px">
                      <img
                        src="https://react-email-demo-ijnnx5hul-resend.vercel.app/static/stack-overflow-header.png"
                        width="340"
                        style="
                          display: block;
                          outline: none;
                          border: none;
                          text-decoration: none;
                        "
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <table
                style="padding: 30px 30px 40px 30px"
                align="center"
                border="0"
                cellpadding="0"
                cellspacing="0"
                role="presentation"
                width="100%"
              >
                <tbody>
                  <tr>
                    <td>
                      <h2
                        style="
                          margin: 0 0 15px;
                          font-weight: bold;
                          font-size: 21px;
                          line-height: 21px;
                          color: #0c0d0e;
                        "
                      >
                        Message
                      </h2>
                       from : ${userEmail} <br/>
                       to : <${users.map((el) => `<span>${el}</span>, `)}> <br/>
                      ${para} 
                      <hr
                        style="
                          width: 100%;
                          border: none;
                          border-top: 1px solid #eaeaea;
                          margin: 30px 0;
                        "
                      />
                      <h2
                        style="
                          margin: 0 0 15px;
                          font-weight: bold;
                          font-size: 21px;
                          line-height: 21px;
                          color: #0c0d0e;
                        "
                      >
                        Attachments
                      </h2>
                      <p
                        style="
                          font-size: 15px;
                          line-height: 21px;
                          margin: 16px 0;
                          color: #3c3f44;
                        "
                      >
                        Here are a few attachments:
                      </p>
                      <ul>
                        ${attachments.map(
                          (el) =>
                            `<li>
                            <a
                              href="${CHAT_S3_BASE_URL}${el.path}"
                              style="
                              font-size: 15px;
                              line-height: 21px;
                              margin: 16px 0;
                              color: #3c3f44;
                            "
                            >
                              ${el.name}
                            </a>
                          </li>`
                        )}
                      </ul>
    
                      <hr
                        style="
                          width: 100%;
                          border: none;
                          border-top: 1px solid #eaeaea;
                          margin: 30px 0;
                        "
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </table>
        <table
          style="width: 680px; margin: 32px auto 0 auto; padding: 0 30px"
          align="center"
          border="0"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
          width="100%"
        >
          <tbody>
            <tr>
              <td>
                <p
                  style="
                    font-size: 12px;
                    line-height: 15px;
                    margin: 16px 0;
                    color: #b7b7b7;
                    text-align: left;
                    margin-bottom: 50px;
                  "
                >
                  ©${year} ArchiveHub Platform <br /><br />All rights reserved.
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
    `;
};
