exports.ET_03 = (name, data) => {
  const date = new Date();
  const year = date.getFullYear();
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
    <html lang="en">
    
      <head>
        <title>Get Notified</title>
      </head>
      <div id="__react-email-preview" style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">ArchiveHub Reminders </div>
      </div>
    
      <body style="background-color:#fff;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,CantarellHelvetica Neue,sans-serif">
        <table align="center" role="presentation" cellSpacing="0" cellPadding="0" border="0" width="100%" style="max-width:37.5em">
          <tr style="width:100%">
            <td>
                <table width="100%" style="padding:30px 20px;width:100%" align="center" role="presentation" cellSpacing="0" cellPadding="0" border="0">
                    <tbody style="width:100%">
                      <tr style="width:100%">
                        <td style="width:6%"><img alt="ArchiveHub" src="https://i.ibb.co/0jbNZFB/books.gif" width="30" height="24" style="display:block;outline:none;border:none;text-decoration:none" /></td>
                        <td style="width:6%"><img alt="ArchiveHub" src="https://i.ibb.co/1qDstW5/logo.gif" width="30" height="24" style="display:block;outline:none;border:none;text-decoration:none" /></td>
                        <td>
                          <table width="100%" align="center" role="presentation" cellSpacing="0" cellPadding="0" border="0">
                            <tbody style="width:100%">
                              <tr style="width:100%">
                                <td><h1 style="display:inline;outline:none;border:none;text-decoration:none;margin-left:5px; font-weight: 900;"> ArchiveHub</h1></td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
              <table style="border:1px solid rgb(0,0,0, 0.1);border-radius:3px;overflow:hidden" align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" width="100%">
                <tbody>
                  <tr>
                    <td><img src="https://react-email-demo-ijnnx5hul-resend.vercel.app/static/yelp-header.png" width="620" style="display:block;outline:none;border:none;text-decoration:none" />
                      <table width="100%" style="padding:20px 40px;padding-bottom:0" align="center" role="presentation" cellSpacing="0" cellPadding="0" border="0">
                        <tbody style="width:100%">
                          <tr style="width:100%">
                            <td>
                              <h1 style="font-size:32px;font-weight:bold;text-align:center">Hi ${name},</h1>
                              <h2 style="font-size:26px;font-weight:bold;text-align:center">Grant Opportunity Reminder.</h2>
                              <p style="font-size:16px;line-height:24px;margin:16px 0"><b>Opportunity Title: </b>${
                                data.opportunitytitle
                              }</p>
                              <p style="font-size:16px;line-height:24px;margin:16px 0;margin-top:-5px"><b>Agency Name: </b>${
                                data.agencyname
                              }</p>
                              <p style="font-size:16px;line-height:24px;margin:16px 0;margin-top:-5px"><b>Award Amount: </b>${
                                data.awardfloor === 'N/A' ? 'N/A' : `$${data.awardfloor}`
                              }</p>
                              <p style="font-size:16px;line-height:24px;margin:16px 0">This opportunity will be clossed within ${
                                data.dateDiff ? `${data.dateDiff} days.` : "today."
                              }</p>
                              <p style="font-size:16px;line-height:24px;margin:16px 0;margin-top:-5px">Hurry up!.</p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table width="100%" style="padding:20px 40px;padding-top:0" align="center" role="presentation" cellSpacing="0" cellPadding="0" border="0">
                        <tbody style="width:100%">
                          <tr style="width:100%">
                            <td colSpan="2" style="display:flex;justify-content:center;width:100%"><a href="${
                              data.additionalinformationurl
                            }" target="_blank" style="background-color:#e00707;padding:0px 0px;border-radius:3px;color:#FFF;font-weight:bold;border:1px solid rgb(0,0,0, 0.1);cursor:pointer;line-height:100%;text-decoration:none;display:inline-block;max-width:100%"><span><!--[if mso]><i style="letter-spacing: undefinedpx;mso-font-width:-100%;mso-text-raise:0" hidden>&nbsp;</i><![endif]--></span><span style="background-color:#e00707;padding:12px 30px;border-radius:3px;color:#FFF;font-weight:bold;border:1px solid rgb(0,0,0, 0.1);cursor:pointer;max-width:100%;display:inline-block;line-height:120%;text-decoration:none;text-transform:none;mso-padding-alt:0px;mso-text-raise:0">Learn More</span><span><!--[if mso]><i style="letter-spacing: undefinedpx;mso-font-width:-100%" hidden>&nbsp;</i><![endif]--></span></a></td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table style="padding:45px 0 0 0" align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" width="100%">
                <tbody>
                  <tr>
                    <td><img src="https://react-email-demo-ijnnx5hul-resend.vercel.app/static/yelp-footer.png" width="620" style="display:block;outline:none;border:none;text-decoration:none" /></td>
                  </tr>
                </tbody>
              </table>
              <p style="font-size:12px;line-height:24px;margin:16px 0;text-align:center;color:rgb(0,0,0, 0.7)">© ${year} | ArchiveHub Platform</p>
            </td>
          </tr>
        </table>
      </body>
    
    </html>`;
};
