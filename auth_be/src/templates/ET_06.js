exports.ET_06 = (firstName, lastName, imgURL) => {
  const date = new Date();
  const year = date.getFullYear();
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
    <html lang="en">
      <head></head>
    
      <body
        style="
          background-color: #ffffff;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
            Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
        "
      >
        <table
          align="center"
          role="presentation"
          cellspacing="0"
          cellpadding="0"
          border="0"
          width="100%"
          style="max-width: 37.5em; margin: 0 auto; padding: 20px 0 48px"
        >
          <tr style="width: 100%">
            <td>
              <div style="display: flex">
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
              </div>
              <p style="font-size: 16px; line-height: 26px; margin: 16px 0">
                Hi All,
              </p>
              <p style="font-size: 16px; line-height: 26px; margin: 16px 0">
                New member alert !!!
              </p>
    
              <div>
                <img
                  alt="ArchiveHub"
                  src="${imgURL}"
                  width="30"
                  height="24"
                  style="
                    display: block;
                    outline: none;
                    border: none;
                    text-decoration: none;
                  "
                />
                <span>${firstName} ${lastName}</span>
              </div>
              <p>View or connect from our ArchiveHub Network.</p>
              <br /><br /><br />
              <p style="font-size: 16px; line-height: 26px; margin: 16px 0">
                Best,<br />The ArchiveHub Team
              </p>
              <hr
                style="
                  width: 100%;
                  border: none;
                  border-top: 1px solid #eaeaea;
                  border-color: #cccccc;
                  margin: 20px 0;
                "
              />
              <p
                style="
                  font-size: 12px;
                  line-height: 24px;
                  margin: 16px 0;
                  color: #8898aa;
                "
              >
              ©${year} ArchiveHub Platform
              </p>
            </td>
          </tr>
        </table>
      </body>
    </html>
    `;
};
