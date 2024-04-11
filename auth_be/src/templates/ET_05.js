exports.ET_05 = (type, email, userName, admin) => {
  const date = new Date();
  const year = date.getFullYear();
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
    <html lang="en">
      <head></head>
      <body
        style="
          background-color: #ffffff;
          color: #24292e;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
            sans-serif, Apple Color Emoji, Segoe UI Emoji;
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
            max-width: 37.5em;
            width: 480px;
            margin: 0 auto;
            padding: 20px 0 48px;
          "
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
                                alt="Slack"
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
                                alt="Slack"
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
              <p style="font-size: 24px; line-height: 1.25; margin: 16px 0">
                ${
                  admin === "network"
                    ? type === "DELETE"
                      ? "Account Deletion Alert"
                      : "Account Restore Alert"
                    : admin === "my"
                    ? type === "DELETE"
                      ? "Your account has been deleted by the admin."
                      : "Your account has been restored by the admin."
                    : type === "DEACTIVATE"
                    ? "Account Termination Alert"
                    : "Account Activation Alert"
                }
              </p>
              <table
                style="
                  padding: 24px;
                  border: solid 1px #dedede;
                  border-radius: 5px;
                  text-align: center;
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
                          font-size: 14px;
                          line-height: 24px;
                          margin: 0 0 10px 0;
                          text-align: left;
                        "
                      >
                        ${admin !== "my" ? "Hey <strong>All</strong>!" : ""}
                      </p>
                      <p
                        style="
                          font-size: 14px;
                          line-height: 24px;
                          margin: 0 0 10px 0;
                          text-align: left;
                        "
                      >
                        ${
                          admin === "network"
                            ? type === "DELETE"
                              ? `Admin delete this account ${userName} (${email}). So this email was received due to the connection of
                              each other in <strong> ArchiveHub Platform. </strong> This
                              user is no longer available your network and no any updates`
                              : `Admin restore this account ${userName} (${email}). o this email was received due to the connection of
                              each other in <strong> ArchiveHub Platform. </strong> This
                              user is now available your network and receive updates.`
                            : admin === "my"
                            ? "Get Help (researcharchivehub@gmail.com)"
                            : type === "DEACTIVATE"
                            ? `The User ${userName} (${email}) is desided to deactivate his / her
                        account. So this email was received due to the connection of
                        each other in <strong> ArchiveHub Platform. </strong> This
                        user is no longer available your network and no any updates.`
                            : `The User ${userName} (${email}) account is activated. So this email was received due to the connection of
                        each other in <strong> ArchiveHub Platform. </strong> This
                        user is now available your network and receive updates.`
                        }
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
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
                        ©${year} ArchiveHub Platform <br /><br />All rights
                        reserved.
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
