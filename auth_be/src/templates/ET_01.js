exports.ET_01 = (password) => {
  const date = new Date();
  const year = date.getFullYear();
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
  <html lang="en">
    <head>
      <title>Confirm Password</title>
    </head>
    <body
      style="
        background-color: #ffffff;
        margin: 0 auto;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
          Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
      "
    >
      <table
        align="center"
        role="presentation"
        cellspacing="0"
        cellpadding="0"
        border="0"
        width="100%"
        style="max-width: 600px; margin: 0 auto"
      >
        <tr style="width: 100%">
          <td>
            <table
              style="margin-top: 32px"
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
                    <table
                      width="100%"
                      style="padding-left: 8px; padding-right: 8px; width: 100%"
                      align="center"
                      role="presentation"
                      cellspacing="0"
                      cellpadding="0"
                      border="0"
                    >
                      <tbody style="width: 100%">
                        <tr style="width: 100%">
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
                  </td>
                </tr>
              </tbody>
            </table>
            <h1
              style="
                color: #1d1c1d;
                font-size: 36px;
                font-weight: 700;
                margin: 30px 0;
                padding: 0;
                line-height: 42px;
              "
            >
              Here is your password
            </h1>
            <p
              style="
                font-size: 20px;
                line-height: 28px;
                margin: 16px 0;
                margin-bottom: 30px;
              "
            >
              Your generated password is below - enter it in your open browser
              window and we&#x27;ll help you get signed in.
            </p>
            <table
              style="
                background: rgb(245, 244, 245);
                border-radius: 4px;
                margin-right: 50px;
                margin-bottom: 30px;
                padding: 43px 23px;
              "
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
                        font-size: 30px;
                        line-height: 24px;
                        margin: 16px 0;
                        text-align: center;
                        vertical-align: middle;
                      "
                    >
                      ${password}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
            <p
              style="
                font-size: 14px;
                line-height: 24px;
                margin: 16px 0;
                color: #000;
              "
            >
              This is auto generated email. Please do not reply.
            </p>
            <table
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
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
};
