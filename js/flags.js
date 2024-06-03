  const flagsByContinent = {
  //europe
      "europe": [
        { "country": "Germany", "flagURL": "https://i.pinimg.com/564x/de/aa/26/deaa268b7910513403f4f560e481858c.jpg" },
        { "country": "France", "flagURL": "https://i.pinimg.com/564x/80/6e/cc/806eccacbb228573969015c1e464bff2.jpg" },
        { "country": "United Kingdom", "flagURL": "https://i.pinimg.com/564x/dc/ba/f9/dcbaf9d8d702cb048e8613b494f40f52.jpg" },
        { "country": "Italy", "flagURL": "https://i.pinimg.com/564x/3c/47/cb/3c47cba5ce721f9b683b706105034a10.jpg" },
        { "country": "Spain", "flagURL": "https://i.pinimg.com/564x/35/1c/e5/351ce5be37644e4c609a214563bab8ee.jpg" },
        { "country": "Poland", "flagURL": "https://i.pinimg.com/564x/02/56/80/02568050c34d5d29b4eab1fa6ae2ef79.jpg" },
        { "country": "Romania", "flagURL": "https://i.pinimg.com/564x/8d/5d/5e/8d5d5e68035240e921ca4448cfacbf34.jpg" },
        { "country": "Netherlands", "flagURL": "https://i.pinimg.com/564x/77/56/60/775660829a348f55aec2bd45d1b4498f.jpg" },
        { "country": "Belgium", "flagURL": "https://i.pinimg.com/736x/85/ee/cb/85eecb9e14b540701c8cf4c9c6253448.jpg" },
        { "country": "Greece", "flagURL": "https://i.pinimg.com/564x/cc/6f/2e/cc6f2ea14913658590c0dc23cb33ce5c.jpg" },
        { "country": "Czech Republic", "flagURL": "https://i.pinimg.com/564x/9d/c1/46/9dc146e5f3aaa46338332b547d97d737.jpg" },
        { "country": "Portugal", "flagURL": "https://i.pinimg.com/564x/32/c7/f5/32c7f532504ef5e995f0c8f668d3981a.jpg" },
        { "country": "Sweden", "flagURL": "https://i.pinimg.com/564x/7d/d4/81/7dd4811d2b1ae3340795c391eea7e3d8.jpg" },
        { "country": "Hungary", "flagURL": "https://i.pinimg.com/564x/53/8d/5b/538d5b95c3b46bb3ff5ad9c45616386a.jpg" },
        { "country": "Belarus", "flagURL": "https://i.pinimg.com/564x/0b/13/70/0b1370a6fedbe1e0170764884d4893ec.jpg" },
        { "country": "Austria", "flagURL": "https://i.pinimg.com/564x/f5/02/7f/f5027f6c3ad0d0e8a36e90d948d4a8c6.jpg" },
        { "country": "Switzerland", "flagURL": "https://i.pinimg.com/564x/a9/c1/15/a9c115ae822ecf5aa79e034c64553793.jpg" },
        { "country": "Bulgaria", "flagURL": "https://i.pinimg.com/736x/27/be/88/27be88c17841a196e2b64b80cc59c3bd.jpg" },
        { "country": "Serbia", "flagURL": "https://i.pinimg.com/564x/56/a1/2b/56a12b562d9509610b59a1cfbf86c567.jpg" },
        { "country": "Denmark", "flagURL": "https://i.pinimg.com/564x/9f/c3/ab/9fc3abc6ab94d3b1cdd24af396a351e6.jpg" },
        { "country": "Finland", "flagURL": "https://i.pinimg.com/564x/a5/36/88/a5368811df8ef8cef1025a9bcb6dc8bf.jpg" },
        { "country": "Slovakia", "flagURL": "https://i.pinimg.com/564x/09/97/e8/0997e83d9956e43383d2b7f217f03cbb.jpg" },
        { "country": "Norway", "flagURL": "https://i.pinimg.com/564x/ff/fe/09/fffe098eec949ea7cd98e2dc3cd7532f.jpg" },
        { "country": "Ireland", "flagURL": "https://i.pinimg.com/564x/50/b7/50/50b750aa497421d96736f025ac0a88c1.jpg" },
        { "country": "Croatia", "flagURL": "https://i.pinimg.com/564x/f5/8c/94/f58c94a2a2b3221328fc1e2b7acfa656.jpg" },
        { "country": "Bosnia and Herzegovina", "flagURL": "https://i.pinimg.com/564x/d8/a1/eb/d8a1eb060488eb992f5392dfe6eb2731.jpg" },
        { "country": "Albania", "flagURL": "https://i.pinimg.com/736x/1f/48/bc/1f48bc664ed25e8cebfda46b905b44b6.jpg" },
        { "country": "Lithuania", "flagURL": "https://i.pinimg.com/564x/12/c6/7d/12c67dc76f69ef2a1425fd76dd69b9cf.jpg" },
        { "country": "Moldova", "flagURL": "https://i.pinimg.com/564x/d2/d0/c3/d2d0c36ed49c0130897f5abf6bc118e0.jpg" },
        { "country": "North Macedonia", "flagURL": "https://i.pinimg.com/564x/88/d3/40/88d3401144bbfc871ee70b15c2e45f42.jpg" },
        { "country": "Slovenia", "flagURL": "https://i.pinimg.com/564x/2d/c9/e5/2dc9e5668bb397cc16b502f065eacc71.jpg" },
        { "country": "Latvia", "flagURL": "https://i.pinimg.com/564x/6a/69/05/6a69057bfd4a32b507e59ee2b1a0bb64.jpg" },
        { "country": "Estonia", "flagURL": "https://i.pinimg.com/564x/4d/d9/79/4dd97949a6759ffdbc9a6761b5078409.jpg" },
        { "country": "Montenegro", "flagURL": "https://i.pinimg.com/564x/3c/66/08/3c660872175f1e0b7e41015372dadd0f.jpg" },
        { "country": "Luxembourg", "flagURL": "https://i.pinimg.com/564x/b7/de/a6/b7dea6abec3321a6f13a552b8beb3db1.jpg" },
        { "country": "Malta", "flagURL": "https://i.pinimg.com/736x/ee/4e/2c/ee4e2c89d31434c2306ec291a80261f3.jpg" },
        { "country": "Iceland", "flagURL": "https://i.pinimg.com/736x/ac/01/87/ac01872d7588ab1e55a3071125dbf135.jpg" },
        { "country": "Andorra", "flagURL": "https://i.pinimg.com/564x/38/3f/9e/383f9eab2d14c679cad9bdcc0a38c729.jpg" },
        { "country": "Liechtenstein", "flagURL": "https://i.pinimg.com/564x/37/e2/cd/37e2cd14deeb210a4dc0a9e83168cd34.jpg" },
        { "country": "Monaco", "flagURL": "https://i.pinimg.com/564x/53/21/92/532192f3b8442b8dfc44bbaca573ee48.jpg" },
        { "country": "San Marino", "flagURL": "https://i.pinimg.com/564x/9a/28/9c/9a289c9fc15326d23ae208cfa7ea4cdf.jpg" },
        { "country": "Vatican City", "flagURL": "https://i.pinimg.com/564x/12/3b/db/123bdb3f660c9d836ba20dfcb14f548c.jpg" },
        { "country": "Cyprus", "flagURL": "https://i.pinimg.com/564x/6e/40/9f/6e409f8f98069b8de2fc894556f3c0a0.jpg" }
    ],

       "north-america": [
        { "country": "USA", "flagURL": "https://i.pinimg.com/564x/ca/92/e9/ca92e9ac15b29f346a6ef716b43df70e.jpg" },
        { "country": "Canada", "flagURL": "https://i.pinimg.com/736x/4d/d4/01/4dd401733ba25e6442fc8696e04e5846.jpg" },
        { "country": "Mexico", "flagURL": "https://i.pinimg.com/564x/5c/f6/10/5cf6106e44db9fde9b1d029326a955af.jpg" },
        { "country": "Guatemala", "flagURL": "https://i.pinimg.com/736x/f6/1b/34/f61b34a192bc0e43b7182bef323facd2.jpg" },
        { "country": "Cuba", "flagURL": "https://i.pinimg.com/564x/c9/be/7f/c9be7ff58087cb4feedbd51ec182fa31.jpg" },
        { "country": "Haiti", "flagURL": "https://i.pinimg.com/564x/43/9f/d1/439fd12f8648755333402727a6fc6b2d.jpg" },
        { "country": "Dominican Republic", "flagURL": "https://i.pinimg.com/564x/f4/f6/90/f4f6908a7d8f2f7702fda96d6aaa48ff.jpg" },
        { "country": "Honduras", "flagURL": "https://i.pinimg.com/564x/90/d7/db/90d7db2ef2a4884071416bafc96797fc.jpg" },
        { "country": "El Salvador", "flagURL": "https://i.pinimg.com/564x/70/a6/b0/70a6b0e5a3c24b0511afb851501c1259.jpg" },
        { "country": "Nicaragua", "flagURL": "https://i.pinimg.com/564x/02/25/d5/0225d5b5f5954eeea365e9d580874a9f.jpg" },
        { "country": "Costa Rica", "flagURL": "https://i.pinimg.com/564x/ce/cc/2c/cecc2c36f19ae21e3644c17e95170e7e.jpg" },
        { "country": "Panama", "flagURL": "https://i.pinimg.com/564x/84/dc/e4/84dce49e52ebfb5b3814393069807e0a.jpg" },
         { "country": "Belize", "flagURL": "https://i.pinimg.com/736x/8a/b6/a4/8ab6a468da5b05310883bdd5fa753957.jpg" },
        { "country": "Jamaica", "flagURL": "https://i.pinimg.com/736x/f5/c2/40/f5c240f57048b83766b2c1e95a7ceadd.jpg" },
        { "country": "Trinidad and Tobago", "flagURL": "https://i.pinimg.com/564x/2c/cc/28/2ccc28d8fab7c860104b5e8eee37a67e.jpg" },
        { "country": "The Bahamas", "flagURL": "https://i.pinimg.com/564x/29/9a/0e/299a0e96b0312e31568e10a9c85f24d2.jpg" },
        { "country": "Barbados", "flagURL": "https://i.pinimg.com/564x/a5/ed/bb/a5edbb74b3e0b42b5af1b08412c90171.jpg" },
        { "country": "Saint Lucia", "flagURL": "https://i.pinimg.com/564x/11/ad/35/11ad3549c66659957320d9cf655775e0.jpg" },
        { "country": "Saint Vincent and the Grenadines", "flagURL": "https://i.pinimg.com/564x/2f/84/cd/2f84cdafcc1fb62e4142a4978ae86e13.jpg" },
        { "country": "Grenada", "flagURL": "https://i.pinimg.com/564x/d2/d3/06/d2d30684aa8d5875cc1656ce36473853.jpg" },
        { "country": "Antigua and Barbuda", "flagURL": "https://i.pinimg.com/564x/07/1d/c9/071dc95c3f10eb628bd56cca86014fcb.jpg" },
        { "country": "Dominica", "flagURL": "https://i.pinimg.com/564x/a5/e8/bc/a5e8bcbe6de5889dfac196bceedd2f6c.jpg" },
        { "country": "Saint Kitts and Nevis", "flagURL": "https://i.pinimg.com/564x/1d/19/16/1d1916da1fa2670bd0f52af16386b14a.jpg" }
    ],

       "south-america": [
        { "country": "Argentina", "flagURL": "https://i.pinimg.com/564x/a5/37/05/a53705b9a77b24e5b04b99e06b737a60.jpg" },
        { "country": "Bolivia", "flagURL": "https://i.pinimg.com/564x/39/23/b0/3923b0e4ab1eaa7870f0753e5701b4f7.jpg" },
        { "country": "Brazil", "flagURL": "https://i.pinimg.com/564x/83/00/5a/83005aee6da36f57dd3a2b2ccf3235ae.jpg" },
        { "country": "Chile", "flagURL": "https://i.pinimg.com/564x/06/a5/df/06a5dff3bd8423a10459937d22e8dc9d.jpg" },
        { "country": "Colombia", "flagURL": "https://i.pinimg.com/564x/ef/79/ff/ef79ffd124ad0da32203bb4191a7cecc.jpg" },
        { "country": "Ecuador", "flagURL": "https://i.pinimg.com/564x/0a/bf/81/0abf81670a9a997d52b0c9cc6bc8e80b.jpg" },
        { "country": "Guyana", "flagURL": "https://i.pinimg.com/564x/bb/a5/eb/bba5ebccf3770447ebb081bd43b5b557.jpg" },
        { "country": "Paraguay", "flagURL": "https://i.pinimg.com/564x/a0/5f/1a/a05f1ae4030f9dadc7d99e78bf2aefb2.jpg" },
        { "country": "Peru", "flagURL": "https://i.pinimg.com/564x/d7/dc/b6/d7dcb663eb9bdc303168f78dc3f7ab7c.jpg" },
        { "country": "Suriname", "flagURL": "https://i.pinimg.com/564x/dd/65/a7/dd65a75e413a46ed05c4483b8174c698.jpg" },
        { "country": "Uruguay", "flagURL": "https://i.pinimg.com/564x/90/73/10/907310165245022abb043e93f0ea448d.jpg" },
        { "country": "Venezuela", "flagURL": "https://i.pinimg.com/736x/26/b8/7e/26b87ec005339ffd79d27e6cf031b4f3.jpg" }
    ],

       "africa": [
        { "country": "Algeria", "flagURL": "https://i.pinimg.com/736x/77/7d/a7/777da7f06273c2b5d564520492d884e2.jpg" },
        { "country": "Angola", "flagURL": "https://i.pinimg.com/736x/35/aa/a9/35aaa9e8b06071e73ae3c1dc3e9bf2d5.jpg" },
        { "country": "Benin", "flagURL": "https://i.pinimg.com/564x/f2/b8/ae/f2b8ae9885ab1adcb40b4612246eafaa.jpg" },
        { "country": "Botswana", "flagURL": "https://i.pinimg.com/564x/5f/38/8e/5f388e17e8192079684e0f2ad97744e2.jpg" },
        { "country": "Burkina Faso", "flagURL": "https://i.pinimg.com/564x/76/42/a5/7642a5927942b970ddc94d1de9213b71.jpg" },
        { "country": "Burundi", "flagURL": "https://i.pinimg.com/736x/8b/8b/4f/8b8b4ffc47fbbb90aa5e6057d1393676.jpg" },
        { "country": "Cabo Verde", "flagURL": "https://i.pinimg.com/564x/06/90/ca/0690ca733b2cac12c98f1c756efa9c63.jpg" },
        { "country": "Cameroon", "flagURL": "https://i.pinimg.com/564x/5b/34/f4/5b34f448edae08d2ad42bf0ce4fce301.jpg" },
        { "country": "Central African Republic", "flagURL": "https://i.pinimg.com/736x/ea/16/f6/ea16f61369c29a90ef05d72b1a1ab8b4.jpg" },
        { "country": "Chad", "flagURL": "https://i.pinimg.com/564x/dc/f9/fe/dcf9feb250e0b3bd6580491ceabe6f52.jpg" },
        { "country": "Comoros", "flagURL": "https://i.pinimg.com/564x/88/8d/7b/888d7b5d6c398ed6b90e2eeee941dc0a.jpg" },
        { "country": "Democratic Republic of the Congo", "flagURL": "https://i.pinimg.com/564x/f4/72/5b/f4725bcf2181bd0252c4cace19a5a3f7.jpg" },
        { "country": "Republic of the Congo", "flagURL": "https://i.pinimg.com/564x/1a/d7/ed/1ad7edeaa628009097d79e8cf7708442.jpg" },
        { "country": "Djibouti", "flagURL": "https://i.pinimg.com/564x/d0/cd/0c/d0cd0c0cbc64f956a9d52de57edfb6ab.jpg" },
        { "country": "Egypt", "flagURL": "https://i.pinimg.com/564x/2e/31/aa/2e31aa3e6c3ae6dd2ceb16c061a064e2.jpg" },
        { "country": "Equatorial Guinea", "flagURL": "https://i.pinimg.com/564x/6d/d5/69/6dd5693fad826efcdfb988fc7f0e5a04.jpg" },
        { "country": "Eritrea", "flagURL": "https://i.pinimg.com/564x/bd/8b/aa/bd8baa5bede879c72edd8b9955acce42.jpg" },
        { "country": "Eswatini", "flagURL": "https://i.pinimg.com/564x/c3/76/51/c37651471f847bc4911a67611cb13e8a.jpg" },
        { "country": "Ethiopia", "flagURL": "https://i.pinimg.com/564x/8f/a4/7a/8fa47a8c4bcc28a6f9f0f7339f8f26be.jpg" },
        { "country": "Gabon", "flagURL": "https://i.pinimg.com/564x/86/62/b8/8662b8c72f24c7bcfddcb7b81bb422ac.jpg" },
        { "country": "Gambia", "flagURL": "https://i.pinimg.com/564x/80/65/5c/80655c157125f82c6c6a9e747cdfd372.jpg" },
        { "country": "Ghana", "flagURL": "https://i.pinimg.com/564x/98/cc/9d/98cc9d34c2d4e96e8c217ad739eb6d9e.jpg" },
        { "country": "Guinea", "flagURL": "https://i.pinimg.com/736x/da/b9/53/dab953e515bba5dbb0f53b76352ffaf8.jpg" },
        { "country": "Guinea-Bissau", "flagURL": "https://i.pinimg.com/564x/d3/b2/2a/d3b22aea9bae5d0778f090cec0029f20.jpg" },
        { "country": "Ivory Coast", "flagURL": "https://i.pinimg.com/564x/98/24/a0/9824a01de0883d348abd9ab97d26b7c4.jpg" },
        { "country": "Kenya", "flagURL": "https://i.pinimg.com/564x/c6/b8/e5/c6b8e5fd68f8643c2c087816675b3396.jpg" },
        { "country": "Lesotho", "flagURL": "https://i.pinimg.com/564x/83/35/fd/8335fdf68c112d87e7e23c415fbf1b8c.jpg" },
        { "country": "Liberia", "flagURL": "https://i.pinimg.com/564x/ea/e4/b9/eae4b96ce90869b4a416c98fcdf85f3c.jpg" },
        { "country": "Libya", "flagURL": "https://i.pinimg.com/564x/39/f0/3d/39f03dc5fb78432ee5d0613686ced72a.jpg" },
        { "country": "Madagascar", "flagURL": "https://i.pinimg.com/736x/49/37/a0/4937a0586256b7590ceeccc9c670560a.jpg" },
        { "country": "Malawi", "flagURL": "https://i.pinimg.com/736x/20/9d/46/209d465b018596440a5f4c70071c17d7.jpg" },
        { "country": "Mali", "flagURL": "https://i.pinimg.com/736x/0f/80/91/0f80913fd253bbdf3049cd60c5968295.jpg" },
        { "country": "Mauritania", "flagURL": "https://i.pinimg.com/564x/d7/de/f1/d7def11cd17e5f9b7b38a84a220beb0f.jpg" },
        { "country": "Mauritius", "flagURL": "https://i.pinimg.com/564x/47/76/1c/47761c2b981383f341ee30590bd2065d.jpg" },
        { "country": "Morocco", "flagURL": "https://i.pinimg.com/564x/96/3e/e7/963ee735fb684e273ff35353f2bbc505.jpg" },
        { "country": "Mozambique", "flagURL": "https://i.pinimg.com/564x/83/16/8f/83168f7933441a2588121608c43d8663.jpg" },
        { "country": "Namibia", "flagURL": "https://i.pinimg.com/736x/fe/a3/55/fea355cfdbe17e3b174b556c629d82e6.jpg" },
        { "country": "Niger", "flagURL": "https://i.pinimg.com/736x/df/9a/0b/df9a0bbf80b8bebb3a22ca3e22c016c6.jpg" },
        { "country": "Nigeria", "flagURL": "https://i.pinimg.com/564x/6e/52/9c/6e529cdb346728ff5186b1f94e555663.jpg" },
        { "country": "Rwanda", "flagURL": "https://i.pinimg.com/564x/24/ea/68/24ea68b1b65d8d3fd4117fb9d8c4e20a.jpg" },
        { "country": "Sao Tome and Principe", "flagURL": "https://i.pinimg.com/564x/75/1e/fa/751efa500e1e3b91c02214cd7caea3cf.jpg" },
        { "country": "Senegal", "flagURL": "https://i.pinimg.com/564x/ab/05/d6/ab05d61aa57c9f094502cc7ba88bf66a.jpg" },
        { "country": "Seychelles", "flagURL": "https://i.pinimg.com/564x/a0/8f/fe/a08ffe96765dd1578a1dd3e36ead9cab.jpg" },
        { "country": "Sierra Leone", "flagURL": "https://i.pinimg.com/564x/f8/49/bc/f849bcd4e01b194d95d82b0207d96780.jpg" },
        { "country": "Somalia", "flagURL": "https://i.pinimg.com/564x/7c/72/d6/7c72d6d3c403daa1af7ca050200f3af0.jpg" },
        { "country": "South Africa", "flagURL": "https://i.pinimg.com/736x/18/0c/ca/180ccaff1c2a5770bcf7e51908bcca01.jpg" },
        { "country": "South Sudan", "flagURL": "https://i.pinimg.com/564x/d2/fe/56/d2fe561be861846cd303d7ed0fda7462.jpg" },
        { "country": "Sudan", "flagURL": "https://i.pinimg.com/564x/15/41/c7/1541c7271788e22097c035c51329ec01.jpg" },
        { "country": "Tanzania", "flagURL": "https://i.pinimg.com/736x/83/1a/c4/831ac43e7050bf6dbf044e13556aa7c1.jpg" },
        { "country": "Togo", "flagURL": "https://i.pinimg.com/564x/49/dc/12/49dc1217610ef0ce9e2ba07797cab6c8.jpg" },
        { "country": "Tunisia", "flagURL": "https://i.pinimg.com/736x/50/30/52/5030528072dadd9fdcc2f6e5a9a6ffc2.jpg" },
        { "country": "Uganda", "flagURL": "https://i.pinimg.com/564x/68/04/63/68046375226994cc46c86edd24ce9a7c.jpg" },
        { "country": "Zambia", "flagURL": "https://i.pinimg.com/564x/67/91/2f/67912f53284031fecc451dc88713f2c7.jpg" },
        { "country": "Zimbabwe", "flagURL": "https://i.pinimg.com/564x/85/aa/37/85aa37defb24c7fabd1d2f680cfa0dff.jpg" }
    ],

        "oceania": [
        { "country": "Australia", "flagURL": "https://i.pinimg.com/564x/c4/d4/9b/c4d49be073d77d3103749b52cd2608c1.jpg" },
        { "country": "Fiji", "flagURL": "https://i.pinimg.com/736x/51/2f/61/512f61e69d2e43a32d8b2fec775b171b.jpg" },
        { "country": "Kiribati", "flagURL": "https://i.pinimg.com/564x/a4/fc/5b/a4fc5b2fce1f48fdd3e252547621ba7d.jpg" },
        { "country": "Marshall Islands", "flagURL": "https://i.pinimg.com/564x/a2/26/04/a226043937206442b6d28ae39ee94259.jpg" },
        { "country": "Micronesia", "flagURL": "https://i.pinimg.com/564x/20/47/06/20470604305b0f7647c42e7cdbe54427.jpg" },
        { "country": "Nauru", "flagURL": "https://i.pinimg.com/564x/60/ed/e0/60ede0a092b9e7c0da24cce5fefa52a9.jpg" },
        { "country": "New Zealand", "flagURL": "https://i.pinimg.com/564x/de/10/29/de10291cb02085486bed8aecafae052b.jpg" },
        { "country": "Palau", "flagURL": "https://i.pinimg.com/564x/a7/4a/9c/a74a9cb75ab8b30397f0791edd093dc8.jpg" },
        { "country": "Papua New Guinea", "flagURL": "https://i.pinimg.com/564x/53/f2/ba/53f2bab20efffd0a3174b2bd300b2b83.jpg" },
        { "country": "Samoa", "flagURL": "https://i.pinimg.com/564x/cf/9f/0b/cf9f0b163c8fedeeb0dff6c1bda2ff64.jpg" },
        { "country": "Solomon Islands", "flagURL": "https://i.pinimg.com/564x/2b/a1/d3/2ba1d3c0358fedbcc2feb040d8b037c0.jpg" },
        { "country": "Tonga", "flagURL": "https://i.pinimg.com/564x/bf/a9/a0/bfa9a03a21ec11d03a740040622359e6.jpg" },
        { "country": "Tuvalu", "flagURL": "https://i.pinimg.com/564x/ae/c3/e5/aec3e599a4d8c44c3436c162d9a74b00.jpg" },
        { "country": "Vanuatu", "flagURL": "https://i.pinimg.com/564x/e7/62/66/e7626683792264383cdfa4490d45348b.jpg" }
    ],

        "asia": [
        { "country": "Afghanistan", "flagURL": "https://i.pinimg.com/564x/18/6f/d9/186fd9d8245846d5df48a4541f655c6c.jpg" },
        { "country": "Armenia", "flagURL": "https://i.pinimg.com/564x/6f/3b/2e/6f3b2e9b66542b4892fc0618156a3a4c.jpg" },
        { "country": "Azerbaijan", "flagURL": "https://i.pinimg.com/564x/67/49/44/674944c231172dc7cec7996e34cd35e6.jpg" },
        { "country": "Bahrain", "flagURL": "https://i.pinimg.com/564x/24/10/89/241089f01fdcf20fad7797532e25033c.jpg" },
        { "country": "Bangladesh", "flagURL": "https://i.pinimg.com/564x/4a/0e/22/4a0e22d2c06a1522ffc2aa23d33a2fa2.jpg" },
        { "country": "Bhutan", "flagURL": "https://i.pinimg.com/564x/db/d2/5b/dbd25b1642fb36300173d8e6763d098b.jpg" },
        { "country": "Brunei", "flagURL": "https://i.pinimg.com/736x/ca/63/59/ca6359f6a95cccb516dc259dc997d7d1.jpg" },
        { "country": "Cambodia", "flagURL": "https://i.pinimg.com/564x/ee/38/b7/ee38b74da1a9aaaeee97805a21425594.jpg" },
        { "country": "China", "flagURL": "https://i.pinimg.com/564x/7b/d2/66/7bd266d99771ab1f3c04c83fc9ab2889.jpg" },
        { "country": "Cyprus", "flagURL": "https://i.pinimg.com/564x/8e/a8/4c/8ea84cafc94725cb89ce0a7c44ffb2e9.jpg" },
        { "country": "Georgia", "flagURL": "https://i.pinimg.com/564x/4e/d3/23/4ed3231768d0af625b3fb434d70d8874.jpg" },
        { "country": "India", "flagURL": "https://i.pinimg.com/736x/d3/70/ae/d370aed4e59a1afa0c1d50daaa1b9699.jpg" },
        { "country": "Indonesia", "flagURL": "https://i.pinimg.com/564x/7b/c3/16/7bc31652bad822728b40e1be105420dc.jpg" },
        { "country": "Iran", "flagURL": "https://i.pinimg.com/564x/82/e9/38/82e93894b1135dc00cb1e3240b6d82a3.jpg" },
        { "country": "Iraq", "flagURL": "https://i.pinimg.com/564x/59/14/5a/59145ac51a3c6bac93400106454d87f2.jpg" },
        { "country": "Israel", "flagURL": "https://i.pinimg.com/564x/b1/1d/18/b11d182ed8ef029f807fee20966c8417.jpg" },
        { "country": "Japan", "flagURL": "https://i.pinimg.com/564x/a8/5f/3d/a85f3de67f4e3e931bd8897118ea4450.jpg" },
        { "country": "Jordan", "flagURL": "https://i.pinimg.com/564x/19/23/11/19231173148f2c6492028a37749863b3.jpg" },
        { "country": "Kazakhstan", "flagURL": "https://i.pinimg.com/564x/9f/01/d3/9f01d3e40ac5b0e210fdd369a74d67fb.jpg" },
        { "country": "Kuwait", "flagURL": "https://i.pinimg.com/564x/fc/69/da/fc69da468d3931f53059d37e1845673c.jpg" },
        { "country": "Kyrgyzstan", "flagURL": "https://i.pinimg.com/564x/c2/e0/b2/c2e0b2feac0db47c79b710d3a1dd41ae.jpg" },
        { "country": "Laos", "flagURL": "https://i.pinimg.com/564x/13/5c/73/135c73ef0f0298914465b2e52b017e20.jpg" },
        { "country": "Lebanon", "flagURL": "https://i.pinimg.com/564x/41/cf/c8/41cfc821d08adfdee59d6a3503ba0c0b.jpg" },
        { "country": "Malaysia", "flagURL": "https://i.pinimg.com/736x/ae/2d/19/ae2d19a448fcf8aa5f001675ca80bec9.jpg" },
        { "country": "Maldives", "flagURL": "https://i.pinimg.com/564x/54/c6/5e/54c65e9bb9a207ba4999c782ac0590c8.jpg" },
        { "country": "Mongolia", "flagURL": "https://i.pinimg.com/564x/0c/0b/94/0c0b947af99f76e8b09e827f32cca675.jpg" },
        { "country": "Myanmar", "flagURL": "https://i.pinimg.com/736x/ca/36/7e/ca367e5ef052694acf611f3aeb4b7f05.jpg" },
        { "country": "Nepal", "flagURL": "https://i.pinimg.com/564x/0e/de/87/0ede876b951d8796c861a804dc98e701.jpg" },
        { "country": "North Korea", "flagURL": "https://i.pinimg.com/736x/06/48/a7/0648a781f0bc6f8b37402ed06fe9518b.jpg" },
        { "country": "Oman", "flagURL": "https://i.pinimg.com/564x/f8/ac/23/f8ac234bcf9e530775fea095aa6e3281.jpg" },
        { "country": "Pakistan", "flagURL": "https://i.pinimg.com/564x/62/ea/d8/62ead8523a642e67a1ed57679908b772.jpg" },
        { "country": "Palestine", "flagURL": "https://i.pinimg.com/564x/c3/41/0e/c3410e97a0d6ef6a49fdce060c8e2829.jpg" },
        { "country": "Philippines", "flagURL": "https://i.pinimg.com/564x/47/bd/df/47bddf4db766b20414c51398040ea48f.jpg" },
        { "country": "Qatar", "flagURL": "https://i.pinimg.com/736x/48/4d/07/484d073e3a7306f35ce1fca2a59fea66.jpg" },
        { "country": "Russia", "flagURL": "https://i.pinimg.com/736x/d5/40/71/d54071e43b3a4126cbce5f8a4485050b.jpg" },
        { "country": "Saudi Arabia", "flagURL": "https://i.pinimg.com/736x/d5/ab/31/d5ab31d59f20ef5fc7301207f4e30b62.jpg" },
        { "country": "Singapore", "flagURL": "https://i.pinimg.com/564x/48/4c/ab/484cabb9696ef8c7b27dcaa47e38c898.jpg" },
        { "country": "South Korea", "flagURL": "https://i.pinimg.com/564x/a7/66/fa/a766fa10206df3cf1c2d75e1d614c523.jpg" },
        { "country": "Sri Lanka", "flagURL": "https://i.pinimg.com/736x/14/f4/f5/14f4f5f1a38cd0493f4ba1e8d5832800.jpg" },
        { "country": "Syria", "flagURL": "https://i.pinimg.com/736x/ab/88/2c/ab882cc26c2e017abecdf1f2bdd41592.jpg" },
        { "country": "Tajikistan", "flagURL": "https://i.pinimg.com/564x/a1/53/fe/a153fe5dab953f27404011344b0240e1.jpg" },
        { "country": "Thailand", "flagURL": "https://i.pinimg.com/564x/41/02/7c/41027c44427e666b9a71c57a9bf95c1e.jpg" },
        { "country": "Timor-Leste", "flagURL": "https://i.pinimg.com/736x/87/55/6b/87556bd7817d39e39515417b277a5b49.jpg" },
        { "country": "Turkey", "flagURL": "https://i.pinimg.com/564x/a7/1b/9f/a71b9f479ab2ed5d856314eb03079568.jpg" },
        { "country": "Turkmenistan", "flagURL": "https://i.pinimg.com/564x/d1/14/ab/d114ab79401b15551ccd093995c11815.jpg" },
        { "country": "United Arab Emirates", "flagURL": "https://i.pinimg.com/564x/c4/67/5e/c4675e65985bd9c71e8fa529d08e9b7d.jpg" },
        { "country": "Uzbekistan", "flagURL": "https://i.pinimg.com/564x/41/f4/ca/41f4ca4f4afd5d0b73eb3f4828ad6a52.jpg" },
        { "country": "Vietnam", "flagURL": "https://i.pinimg.com/564x/96/ed/5b/96ed5b109524a2705a4e3aaeaa9048f6.jpg" },
        { "country": "Yemen", "flagURL": "https://i.pinimg.com/564x/9f/1c/fe/9f1cfeb0e631b2c3ed8c20ccdcb1915d.jpg" }
    ],

         "antarctica": [
        { "country": "Argentina", "flagURL": "https://i.pinimg.com/564x/a5/37/05/a53705b9a77b24e5b04b99e06b737a60.jpg" },
        { "country": "Australia", "flagURL": "https://i.pinimg.com/564x/c4/d4/9b/c4d49be073d77d3103749b52cd2608c1.jpg" },
        { "country": "Chile", "flagURL": "https://i.pinimg.com/564x/24/15/97/241597e7f74f3e7db9b7524006349da4.jpg" },
        { "country": "France", "flagURL": "https://i.pinimg.com/564x/80/6e/cc/806eccacbb228573969015c1e464bff2.jpg" },
        { "country": "New Zealand", "flagURL": "https://i.pinimg.com/564x/de/10/29/de10291cb02085486bed8aecafae052b.jpg" },
        { "country": "Norway", "flagURL": "https://i.pinimg.com/564x/ff/fe/09/fffe098eec949ea7cd98e2dc3cd7532f.jpg" },
        { "country": "United Kingdom", "flagURL": "https://i.pinimg.com/736x/f7/f1/f2/f7f1f2ff22c207a7768ff8fa761f1a5b.jpg" },
        { "country": "United States", "flagURL": "https://i.pinimg.com/564x/5a/36/e6/5a36e60ef0e7d9a0609a896d7878ab73.jpg" }
    ],
    // continents znaishia apa
};

function createFlagCard(country, flagURL) {
            const card = document.createElement('div');
            card.className = 'flag-card';
            card.innerHTML = `
                <img class="flag-image" src="${flagURL}" alt="Flag" onclick="revealCountry(this)">
                <p class="country-name">${country}</p>
            `;
            return card;
        }

        function shuffle(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }

        function revealCountry(element) {
            const countryName = element.nextElementSibling;
            countryName.style.display = 'block';
            element.style.opacity = '0.5';
            element.onclick = null;
        }

        function backToHome() {
            window.location.href = 'index.html';
        }

        function displayFlags(category) {
            const container = document.getElementById('flags-container');
            container.innerHTML = '';

            let flags;
            if (category === 'random') {
                flags = Object.values(flagsByContinent).flat();
            } else {
                flags = flagsByContinent[category];
            }

            flags = shuffle(flags);

            flags.forEach(flag => {
                const card = createFlagCard(flag.country, flag.flagURL);
                container.appendChild(card);
            });
        }

        // Initial display
        displayFlags('random');
