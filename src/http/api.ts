function timeout() {
  return new Promise((resolve) => setTimeout(resolve, 2000));
}

export const getBtc = async () => {
  try {
    await timeout();
    const response = await fetch(
      "https://api.coindesk.com/v1/bpi/currentprice.json"
    );
    return await response.json();
  } catch (err) {
    console.error(err);
  }
};
