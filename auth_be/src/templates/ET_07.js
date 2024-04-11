exports.ET_07 = (userName, affliations, grants) => {
  const date = new Date();
  const year = date.getFullYear();
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
  <html lang="en">
  
    <body style="background-color:#dbddde;font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Roboto,Oxygen-Sans,Ubuntu,Cantarell,&quot;Helvetica Neue&quot;,sans-serif">
      <table align="center" role="presentation" cellSpacing="0" cellPadding="0" border="0" width="100%" style="max-width:37.5em;margin:30px auto;width:610px;background-color:#fff;border-radius:5px;overflow:hidden">
        <tr style="width:100%">
          <td>
            <table align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" width="100%">
              <tbody>
                <tr>
                  <td>
                  <td><img alt="ArchiveHub" src="https://react-email-demo-ijnnx5hul-resend.vercel.app/static/google-play-header.png" width="305" height="28" style="display:block;outline:none;border:none;text-decoration:none;margin-top:-1px" /><img alt="ArchiveHub" src="https://i.ibb.co/0jbNZFB/books.gif" width="50" height="31" style="display:block;outline:none;border:none;text-decoration:none;padding:0 40px" /><center>ArchiveHub Platform</center></td>
          </td>
        </tr>
        </tbody>
      </table>
      <table style="padding:0 40px" align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" width="100%">
        <tbody>
          <tr>
            <td>
              <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#e8eaed;margin:20px 0" />
              <p style="font-size:14px;line-height:26px;margin:16px 0;font-weight:700;color:#004dcf">GRANTS OPPORTUNITIES</p>
              <p style="font-size:14px;line-height:22px;margin:16px 0;color:#3c4043">Dear All,</p>
              <p style="font-size:14px;line-height:22px;margin:16px 0;color:#3c4043">I am happy to share my grants with you. Please go through those if you are preffered.</p>
            </td>
          </tr>
        </tbody>
      </table>
      <table style="padding-left:40px" align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" width="100%">
        <tbody>
          <tr>
            <td>
              <ul>
                ${grants.map(
                  (el, index) =>
                    `<li key={${index}}>
                    <a
                      href=${el.additionalinformationurl}
                      style="color:#004dcf;text-decoration:none;font-size:14px;line-height:22px"
                    >
                      <p>
                        ${el.opportunitytitle} Due: ${el.closedate} Amount:
                        ${
                          el.awardfloor === 0 ||
                          el.awardfloor === 1 ||
                          el.awardfloor === "N/A"
                            ? " To be discussed"
                            : ` $${el.awardfloor}`
                        }
                      </p>
                    </a>
                  </li>`
                )}
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
      <table style="padding:0 40px" align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" width="100%">
        <tbody>
          <tr>
            <td>
              <p style="font-size:14px;line-height:22px;margin:16px 0;color:#3c4043">Thank you,</p>
              <p style="font-size:20px;line-height:22px;margin:16px 0;color:#3c4043">${userName}</p>
              <p style="font-size:14px;line-height:22px;margin:16px 0;color:#3c4043">${affliations}</p>
            </td>
          </tr>
        </tbody>
      </table>
      <table style="background-color:#f0fcff;width:90%;border-radius:5px;overflow:hidden;padding-left:20px" align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" width="100%">
        <tbody>
          <tr>
            <td>
             
              <table width="100%" align="center" style="width:84px;float:left" role="presentation" cellSpacing="0" cellPadding="0" border="0">
                <tbody style="width:100%">
                  <tr style="width:100%">
  
                  </tr>
                </tbody>
              </table><img src="https://react-email-demo-ijnnx5hul-resend.vercel.app/static/google-play-footer.png" width="540" height="48" style="display:block;outline:none;border:none;text-decoration:none" />
            </td>
          </tr>
        </tbody>
      </table>
      <table style="padding:0 40px;padding-bottom:30px" align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" width="100%">
        <tbody>
          <tr>
            <td>
              <p style="font-size:12px;line-height:22px;margin:0;color:#3c4043;text-align:center">© ${year} ArchiveHub Platform</p>
              <p style="font-size:12px;line-height:22px;margin:0;color:#3c4043;text-align:center">All Rights Reserved</p>
            </td>
          </tr>
        </tbody>
      </table>
      </td>
      </tr>
      </table>
    </body>
  
  </html>`;
};
