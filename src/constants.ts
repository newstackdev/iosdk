export const LICENSES = [
  [
    "Creative Commons - No Rights Reserved",
    "CC0",
    "(aka CC Zero) is a public dedication tool, which allows creators to give up their copyright and put their works into the worldwide public domain. CC0 allows reusers to distribute, remix, adapt, and build upon the material in any medium or format, with no conditions.",
    "https://creativecommons.org/publicdomain/zero/1.0/",
  ],
  [
    "Creative Commons - Attribution",
    "CC-BY",
    "This license allows reusers to distribute, remix, adapt, and build upon the material in any medium or format, so long as attribution is given to the creator. The license allows for commercial use.",
    "https://creativecommons.org/licenses/by/4.0/",
  ],
  [
    "Creative Commons - Attribution-ShareAlike",
    "CC-BY-SA",
    "This license allows reusers to distribute, remix, adapt, and build upon the material in any medium or format, so long as attribution is given to the creator. The license allows for commercial use. If you remix, adapt, or build upon the material, you must license the modified material under identical terms.",
    "https://creativecommons.org/licenses/by-sa/4.0/",
  ],
  [
    "Creative Commons - Attribution-NonCommercial",
    "CC-by-NC",
    "This license allows reusers to distribute, remix, adapt, and build upon the material in any medium or format for noncommercial purposes only, and only so long as attribution is given to the creator. ",
    "https://creativecommons.org/licenses/by-nc/4.0/",
  ],
  [
    "Creative Commons - Attribution-NonCommercial-ShareAlike",
    "CC-BY-NC-SA",
    "This license allows reusers to distribute, remix, adapt, and build upon the material in any medium or format for noncommercial purposes only, and only so long as attribution is given to the creator. If you remix, adapt, or build upon the material, you must license the modified material under identical terms. ",
    "https://creativecommons.org/licenses/by-nc-sa/4.0/",
  ],
  [
    "Creative Commons - Attribution-NoDerivatives",
    "CC-BY-ND",
    "This license allows reusers to copy and distribute the material in any medium or format in unadapted form only, and only so long as attribution is given to the creator. The license allows for commercial use. ",
    "https://creativecommons.org/licenses/by-nd/4.0/",
  ],
  [
    "Creative Commons - Attribution-NonCommercial-NoDerivatives",
    "CC-BY-NC-ND",
    "This license allows reusers to copy and distribute the material in any medium or format in unadapted form only, for noncommercial purposes only, and only so long as attribution is given to the creator.",
    "https://creativecommons.org/licenses/by-nc-nd/4.0/",
  ],
  ["Commercial - Exclusive", "CO-EX", ""],
  ["Commercial - Non-exclusive", "CO-NEX", ""],
];

export const OEMBED_PROVIDERS = [
  {
    provider_name: "YouTube",
    provider_url: "https://www.youtube.com/",
    endpoints: [
      {
        schemes: [
          "https://*.youtube.com/watch*",
          "https://*.youtube.com/v/*",
          "https://youtu.be/*",
          "https://*.youtube.com/playlist?list=*",
          "https://youtube.com/playlist?list=*",
          "https://*.youtube.com/shorts*",
        ],
        url: "https://www.youtube.com/oembed",
        discovery: true,
      },
    ],
  },
  {
    provider_name: "Twitter",
    provider_url: "http://www.twitter.com/",
    endpoints: [
      {
        schemes: [
          "https://twitter.com/*",
          "https://twitter.com/*/status/*",
          "https://*.twitter.com/*/status/*",
        ],
        url: "https://publish.twitter.com/oembed",
      },
    ],
  },
];
