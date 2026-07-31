import dns from 'dns';

dns.resolveMx('crestafoods.in', (err, addresses) => {
  if (err) {
    console.error("DNS Error:", err.message);
  } else {
    console.log("MX Records for crestafoods.in:");
    console.log(addresses);
  }
});
