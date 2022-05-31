import { body, param, query } from "express-validator";

export const validatorArrays = {
  createUser: [
    body("givenNames")
      .exists()
      .isLength({ min: 2, max: 100 })
      .withMessage(
        "Given names are mandatory and must be between 2 and 100 characters long."
      ),
    body("familyNames")
      .exists()
      .isLength({ min: 2, max: 100 })
      .withMessage(
        "Family names are mandatory and must be between 2 and 100 characters long."
      ),
    body("docIdNumber")
      .exists()
      .isInt({ min: 2 })
      .withMessage(
        "Document ID number is mandatory and must be greater than or equal to 2."
      ),
    body("signatureFileUrl")
      .optional()
      .isLength({ min: 2, max: 100 })
      .withMessage(
        "Signature File URL must be between 2 and 100 characters long."
      ),
    body("photoFileUrl")
      .optional()
      .isLength({ min: 2, max: 100 })
      .withMessage("Photo File URL must be between 2 and 100 characters long."),
    body("countryCode")
      .exists()
      .isLength({ min: 2, max: 2 })
      .withMessage("Country code is mandatory and must be 2 characters long."),
    body("state")
      .optional()
      .isLength({ min: 2, max: 50 })
      .withMessage("State must be between 2 and 50 characters long."),
    body("city")
      .optional()
      .isLength({ min: 2, max: 50 })
      .withMessage("City must be between 2 and 50 characters long."),
    body("fingerprintFileUrl")
      .optional()
      .isLength({ min: 2, max: 100 })
      .withMessage(
        "Fingerprint File URL must be between 2 and 100 characters long."
      ),
    body("birthDate")
      .exists()
      .withMessage(
        "Birth date is mandatory, must be a valid date and must be at least 18 years old."
      ),
    body("height")
      .optional()
      .isInt({ min: 50, max: 250 })
      .withMessage(
        "Height must be a valid number for cm, between 50cm and 250cm."
      ),
    body("bloodType")
      .optional()
      .isIn(["A", "B", "AB", "O", "Undefined"])
      .withMessage(
        "Blood Type must be one of these values: A, B, AB, O or Undefined."
      ),
    body("rh")
      .optional()
      .isIn(["Positive", "Negative", "Undefined"])
      .withMessage(
        "RH must be one of these values: Positive, Negative or Undefined."
      ),
    body("gender")
      .optional()
      .isIn(["Male", "Female", "Other", "Undefined"])
      .withMessage(
        "Gender must be one of these values: Male, Female, Other, Undefined."
      ),
    body("expeditionPlace")
      .exists()
      .isLength({ min: 2, max: 100 })
      .withMessage(
        "Expedition place is mandatory and must be between 2 and 100 characters long."
      ),
  ],
  getOneUserById: [
    param("id")
      .exists()
      .isInt({ min: 0 })
      .withMessage("id is mandatory and must be greater than or equal to 0."),
  ],
  getUserTokenByUsername: [
    param("username")
      .exists()
      .isLength({ min: 2, max: 100 })
      .withMessage(
        "Username is mandatory and must be between 2 and 100 characters long."
      ),
  ],
};
