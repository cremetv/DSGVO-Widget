<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>

    <div id="privacy-container">
      privacy
    </div>

    <div id="impressum-container">
      impressum
    </div>

    <script type="text/javascript" src="dsgvo.js"></script>
    <script type="text/javascript">
      /* init function with client key */
      DSGVO.init({
        key: 'lor3m1p5um'
      });
      /* get client data | insert directly into target element */
      DSGVO.get('privacy', '#privacy-container');
      // DSGVO.get('impressum', '#impressum-container');

      /* get all elements */
      let blocks;
      let getElements = DSGVO.getElements();
      getElements.then(data => blocks = data);

      /** get raw client data as json
        * returns:
        * client: informations about client
        * impressum: all impressum blocks for this client
        * privacy: all privacy blocks for this client
        */
      let rawData = DSGVO.get();
      rawData.then(data => {
        console.log('raw data:', data);
      });
    </script>
  </body>
</html>
