export function getApiErrorMessage(error) {
  const responseData = error.response?.data;

  if (typeof responseData?.message === "string") {
    return responseData.message;
  }

  if (Array.isArray(responseData)) {
    const messages = responseData
      .map((item) => item?.message ?? item?.Message)
      .filter((message) => typeof message === "string");

    if (messages.length > 0) {
      return messages.join(" ");
    }
  }

  if (Array.isArray(responseData?.errors)) {
    return responseData.errors.join(" ");
  }

  if (
    responseData?.errors &&
    typeof responseData.errors === "object"
  ) {
    return Object.values(responseData.errors).flat().join(" ");
  }

  if (typeof responseData?.title === "string") {
    return responseData.title;
  }

  if (!error.response) {
    return "Could not connect to RentEase. Check that the API is running.";
  }

  return "The request could not be completed. Please try again.";
}
