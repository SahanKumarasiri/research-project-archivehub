exports.ET_02 = (url, name) => {
  const date = new Date();
  const year = date.getFullYear();
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
    <html lang="en">
      <head>
        <title>Reset Password</title>
      </head>
      <body
        style="
          background-color: #f6f9fc;
          padding: 10px 0;
          font-family: Open Sans, HelveticaNeue-Light, Helvetica Neue Light,
            Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;
        "
      >
        <table
          align="center"
          role="presentation"
          cellspacing="0"
          cellpadding="0"
          border="0"
          width="100%"
          style="max-width: 37.5em"
        >
          <tr>
            <td style="width: 100%">
              <table
                width="100%"
                style="padding: 30px 20px; width: 100%"
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
                                  font-family: -apple-system, BlinkMacSystemFont,
                                    Segoe UI, Roboto, Oxygen-Sans, Ubuntu,
                                    CantarellHelvetica Neue, sans-serif;
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
                align="center"
                role="presentation"
                cellspacing="0"
                cellpadding="0"
                border="0"
                width="100%"
                style="
                  background-color: #ffffff;
                  border: 1px solid #f0f0f0;
                  padding: 45px;
                "
              >
                <tr style="width: 100%">
                  <td>
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
                                font-size: 16px;
                                line-height: 26px;
                                margin: 16px 0;
                                font-weight: 300;
                                color: #404040;
                                margin-top: 0%;
                              "
                            >
                              Hi ${name},
                            </p>
                            <p
                              style="
                                font-size: 16px;
                                line-height: 26px;
                                margin: 16px 0;
                                font-weight: 300;
                                color: #404040;
                              "
                            >
                              You recently requested a password change for your
                              ArchiveHub account. If this was you, you can set a new
                              password here:
                            </p>
                            <a
                              href='${url}'
                              target="_blank"
                              style="
                                background-color: #007ee6;
                                border-radius: 4px;
                                color: #fff;
                                font-family: Open Sans, Helvetica Neue, Arial;
                                font-size: 15px;
                                text-decoration: none;
                                text-align: center;
                                display: inline-block;
                                width: 210px;
                                padding: 0px 0px;
                                line-height: 100%;
                                max-width: 100%;
                              "
                              ><span
                                ><!--[if mso
                                  ]><i
                                    style="
                                      letter-spacing: undefinedpx;
                                      mso-font-width: -100%;
                                      mso-text-raise: 0;
                                    "
                                    hidden
                                    >&nbsp;</i
                                  ><!
                                [endif]--></span
                              ><span
                                style="
                                  background-color: #007ee6;
                                  border-radius: 4px;
                                  color: #fff;
                                  font-family: Open Sans, Helvetica Neue, Arial;
                                  font-size: 15px;
                                  text-decoration: none;
                                  text-align: center;
                                  display: inline-block;
                                  width: 210px;
                                  padding: 14px 7px;
                                  max-width: 100%;
                                  line-height: 120%;
                                  text-transform: none;
                                  mso-padding-alt: 0px;
                                  mso-text-raise: 0;
                                "
                                >Reset password</span
                              ><span
                                ><!--[if mso
                                  ]><i
                                    style="
                                      letter-spacing: undefinedpx;
                                      mso-font-width: -100%;
                                    "
                                    hidden
                                    >&nbsp;</i
                                  ><!
                                [endif]--></span
                              ></a
                            >
                            <p
                              style="
                                font-size: 16px;
                                line-height: 26px;
                                margin: 16px 0;
                                font-weight: 300;
                                color: #404040;
                              "
                            >
                              If you don&#x27;t want to change your password or
                              didn&#x27;t request this, just ignore and delete this
                              message.
                            </p>
                            <p
                              style="
                                font-size: 16px;
                                line-height: 26px;
                                margin: 16px 0;
                                font-weight: 300;
                                color: #404040;
                              "
                            >
                              To keep your account secure, please don&#x27;t forward
                              this email to anyone.
                            </p>
                            <p
                              style="
                                font-size: 16px;
                                line-height: 26px;
                                margin: 16px 0;
                                font-weight: 300;
                                color: #404040;
                              "
                            >
                              Happy Researching!
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
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
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
    `;
};
