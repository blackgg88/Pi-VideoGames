const isValidUrl = (url) => {
  try {
    new URL(url);
  } catch (e) {
    console.error(e);
    return false;
  }
  return true;
};

export function validateInput(input) {
  const errors = {};
  if (!input.name) {
    errors.name = "Name is required";
  } else if (input.name.length > 100) {
    errors.name = "Name is too long (Max = 100 characters)";
  }

  if (!input.description) {
    errors.description = "Description is required";
  } else if (input.description.length > 1500) {
    errors.description = "Description is too long. (Max = 1500 characters)";
  }

  if (!input.rating) {
    errors.rating = "Rating is required";
  } else if (input.rating > 5 || input.rating < 0) {
    errors.rating = "Rating must range between 0 to 5";
  }

  if (!input.release_date) {
    errors.released = "Date of release is required";
  }

  if (!input.image) {
    errors.image = "Image URL is required";
  } else if (!isValidUrl(input.image)) {
    errors.image = "Not validated as URL";
  }

  if (!input.genres.length) {
    errors.genres = "Minimun one Genre is required ";
  }

  if (!input.platforms.length) {
    errors.platforms = "Minimun one Platform is required";
  }

  return errors;
}
