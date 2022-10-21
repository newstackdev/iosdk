var popUpObj;

export const showPopUp = (url, name) => {
  popUpObj = window.open(
    url,

    name,

    // "toolbar=no," +
    //   "scrollbars=no," +
    "location=no," + "statusbar=no," + "menubar=no," + "resizable=0," + "width=600," + "height=800," + "left = 600," + "top=300",
  );

  popUpObj.focus();
};
