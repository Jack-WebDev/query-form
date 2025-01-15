"use client";

import { ChangeEventHandler, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

type APData = {
  propertyName: string;
  contactNumber: string;
  email: string;
  fullName: string;
  idNumber: string;
};

type StudentData = {
  fullName: string;
  email: string;
  contactNumber: string;
  accommodation: string;
  idNumber: string;
  institution: string;
  campus: string;
};

type OtherData = {
  fullName: string;
  email: string;
  contactNumber: string;
  idNumber: string;
};

type QueryData = {
  query: string;
  describeQuery: string;
};

type UserType = "AP" | "Student" | "other";

type FormData = {
  typeOfUser: UserType;
  AP: APData;
  Student: StudentData;
  other: OtherData;
  Query: QueryData;
};

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    typeOfUser: "Student",
    AP: {
      propertyName: "",
      contactNumber: "",
      email: "",
      fullName: "",
      idNumber: "",
    },
    Student: {
      fullName: "",
      email: "",
      contactNumber: "",
      accommodation: "",
      idNumber: "",
      institution: "",
      campus: "",
    },
    other: {
      fullName: "",
      email: "",
      contactNumber: "",
      idNumber: "",
    },
    Query: {
      query: "",
      describeQuery: "",
    },
  });

  const [currentStep, setCurrentStep] = useState(1);

  const options = [
    { label: "a Student", value: "Student" },
    { label: "an Accommodation Provider", value: "AP" },
    { label: "other", value: "other" },
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    const userType = formData.typeOfUser;

    setFormData((prev) => ({
      ...prev,
      [userType]: {
        ...prev[userType],
        [name]: value,
      },
      Query: {
        ...prev.Query,
        [name]: value,
      },
    }));
  };

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const slideTransition = {
    type: "spring",
    stiffness: 300,
    damping: 30,
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center px-8 mb-12">
        <Image
          src={"/NSFAS-699x675-1.png"}
          alt="NSFAS Logo"
          width={100}
          height={100}
        />
        <Image
          src={"/ndt-technologies-web-logo.svg"}
          alt="NDT Logo"
          width={100}
          height={100}
        />
      </div>
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl">
        <div className="relative">
          {/* Progress bar */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gray-200 rounded-t-2xl">
            <motion.div
              className="h-full rounded-t-2xl"
              style={{ backgroundColor: "rgb(161,38,31)" }}
              initial={{ width: "25%" }}
              animate={{ width: `${currentStep * 25}%` }}
              transition={slideTransition}
            />
          </div>

          <div className="pt-8 px-8 pb-8">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.section
                  key="step1"
                  {...fadeIn}
                  transition={slideTransition}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-gray-900 text-center">
                    I am...
                  </h2>
                  <div role="radiogroup" className="space-y-4">
                    {options.map((option) => (
                      <label
                        key={option.value}
                        className="flex items-center p-4 rounded-xl border-2 transition-all cursor-pointer hover:border-[rgb(161,38,31)] hover:bg-primary/5"
                        style={{
                          borderColor:
                            formData.typeOfUser === option.value
                              ? "rgb(161,38,31)"
                              : "#e5e7eb",
                          backgroundColor:
                            formData.typeOfUser === option.value
                              ? "rgb(128,123,156,0.1)"
                              : "transparent",
                        }}
                      >
                        <input
                          type="radio"
                          name="typeOfUser"
                          value={option.value}
                          checked={formData.typeOfUser === option.value}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              typeOfUser: e.target.value as UserType,
                            })
                          }
                          className="w-4 h-4 text-[rgb(161,38,31)]"
                        />
                        <span className="ml-3 font-medium text-gray-900">
                          {option.label}
                        </span>
                      </label>
                    ))}
                  </div>
                  <div className="flex justify-end pt-6">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={nextStep}
                      disabled={!formData.typeOfUser}
                      className="px-6 py-2 bg-primary text-white rounded-lg font-medium 
                               disabled:opacity-50 disabled:cursor-not-allowed
                               transition-all hover:shadow-lg"
                    >
                      Next
                    </motion.button>
                  </div>
                </motion.section>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  {...fadeIn}
                  transition={slideTransition}
                >
                  {formData.typeOfUser === "Student" ? (
                    <StudentDetails
                      formData={formData.Student}
                      handleChange={handleChange}
                    />
                  ) : formData.typeOfUser === "AP" ? (
                    <APDetails
                      formData={formData.AP}
                      handleChange={handleChange}
                    />
                  ) : (
                    <OtherDetails
                      formData={formData.other}
                      handleChange={handleChange}
                    />
                  )}
                  <div className="flex justify-between pt-6">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={prevStep}
                      className="px-6 py-2 border-2 border-[rgb(161,38,31)] text-[rgb(161,38,31)] 
                               rounded-lg font-medium transition-all hover:bg-primary/5"
                    >
                      Back
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={nextStep}
                      className="px-6 py-2 bg-primary text-white rounded-lg font-medium 
                               transition-all hover:shadow-lg"
                    >
                      Next
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  {...fadeIn}
                  transition={slideTransition}
                >
                  <Query
                    formData={formData.Query}
                    handleChange={handleChange}
                  />
                  <div className="flex justify-between pt-6">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={prevStep}
                      className="px-6 py-2 border-2 border-[rgb(161,38,31)] text-[rgb(161,38,31)] 
                               rounded-lg font-medium transition-all hover:bg-primary/5"
                    >
                      Back
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={nextStep}
                      className="px-6 py-2 bg-primary text-white rounded-lg font-medium 
                               transition-all hover:shadow-lg"
                    >
                      Next
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  {...fadeIn}
                  transition={slideTransition}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-gray-900">
                    Review and Submit
                  </h2>
                  {formData.typeOfUser === "Student" ? (
                    <>
                      <StudentReview
                        formData={formData.Student}
                        handleChange={handleChange}
                      />
                      <QueryReview
                        formData={formData.Query}
                        handleChange={handleChange}
                      />
                    </>
                  ) : formData.typeOfUser === "AP" ? (
                    <>
                      <APReview
                        formData={formData.AP}
                        handleChange={handleChange}
                      />
                      <QueryReview
                        formData={formData.Query}
                        handleChange={handleChange}
                      />
                    </>
                  ) : (
                    <>
                      <OtherReview
                        formData={formData.other}
                        handleChange={handleChange}
                      />
                      <QueryReview
                        formData={formData.Query}
                        handleChange={handleChange}
                      />
                    </>
                  )}
                  <div className="flex justify-between pt-6">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={prevStep}
                      className="px-6 py-2 border-2 border-[rgb(161,38,31)] text-[rgb(161,38,31)] 
                               rounded-lg font-medium transition-all hover:bg-primary/5"
                    >
                      Back
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => console.log(formData)}
                      className="px-6 py-2 bg-primary text-white rounded-lg font-medium 
                               transition-all hover:shadow-lg"
                    >
                      Submit
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

type StepProps<T> = {
  formData: T;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
};

const inputVariants = {
  focus: { scale: 1.02, boxShadow: "0 0 0 2px rgb(128,123,156,0.2)" },
  tap: { scale: 0.98 },
};

const formGroupVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const reviewVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

type FormInputProps = {
  name: string;
  value: string | number;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  type?: string;
  className?: string;
};

type ReviewItemProps = {
  label: string;
  value?: string;
  className?: string;
};

const FormInput = ({
  name,
  value,
  onChange,
  placeholder,
  type = "text",
}: FormInputProps) => (
  <motion.div className="w-full mb-4">
    <motion.input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      whileFocus="focus"
      whileTap="tap"
      variants={inputVariants}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none
                 focus:border-primary transition-colors
                 placeholder-gray-400 text-gray-700"
    />
  </motion.div>
);

export function StudentDetails({
  formData,
  handleChange,
}: StepProps<StudentData>) {
  return (
    <motion.div
      variants={formGroupVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="space-y-6"
    >
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Student Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Full Name"
        />
        <FormInput
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          type="email"
        />
        <FormInput
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
          placeholder="Contact Number"
        />
        <FormInput
          name="idNumber"
          value={formData.idNumber}
          onChange={handleChange}
          placeholder="ID Number"
        />
        <FormInput
          name="institution"
          value={formData.institution}
          onChange={handleChange}
          placeholder="Institution"
        />
        <FormInput
          name="campus"
          value={formData.campus}
          onChange={handleChange}
          placeholder="Campus"
        />
        <FormInput
          name="accommodation"
          value={formData.accommodation}
          onChange={handleChange}
          placeholder="Accommodation"
          className="md:col-span-2"
        />
      </div>
    </motion.div>
  );
}

export function Query({ formData, handleChange }: StepProps<QueryData>) {
  return (
    <motion.div
      variants={formGroupVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="space-y-6"
    >
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Query</h3>
      <div className="space-y-4">
        <FormInput
          name="query"
          value={formData.query}
          onChange={handleChange}
          placeholder="What's your query about?"
        />
        <motion.textarea
          name="describeQuery"
          value={formData.describeQuery}
          onChange={handleChange}
          placeholder="Please describe your query in detail..."
          whileFocus="focus"
          whileTap="tap"
          variants={inputVariants}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 
                     focus:outline-none focus:border-primary 
                     transition-colors placeholder-gray-400 text-gray-700
                     min-h-[120px] resize-y"
        />
      </div>
    </motion.div>
  );
}

export function APDetails({ formData, handleChange }: StepProps<APData>) {
  return (
    <motion.div
      variants={formGroupVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="space-y-6"
    >
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        Accommodation Provider Details
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          name="propertyName"
          value={formData.propertyName}
          onChange={handleChange}
          placeholder="Property Name"
        />
        <FormInput
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
          placeholder="Contact Number"
        />
        <FormInput
          name="idNumber"
          value={formData.idNumber}
          onChange={handleChange}
          placeholder="ID Number"
        />
        <FormInput
          name="propertyName"
          value={formData.propertyName}
          onChange={handleChange}
          placeholder="Property Name"
        />
      </div>
    </motion.div>
  );
}

export function OtherDetails({ formData, handleChange }: StepProps<OtherData>) {
  return (
    <motion.div
      variants={formGroupVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="space-y-6"
    >
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Other Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Full Name"
        />
        <FormInput
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          type="email"
        />
        <FormInput
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
          placeholder="Contact Number"
        />
        <FormInput
          name="idNumber"
          value={formData.idNumber}
          onChange={handleChange}
          placeholder="ID Number"
        />
      </div>
    </motion.div>
  );
}

const ReviewItem = ({ label, value }: ReviewItemProps) => (
  <motion.div
    className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm"
    whileHover={{ scale: 1.01 }}
    transition={{ type: "spring", stiffness: 400, damping: 25 }}
  >
    <p className="text-sm text-gray-500 mb-1">{label}</p>
    <p className="text-gray-900 font-medium">{value || "Not provided"}</p>
  </motion.div>
);

export function StudentReview({ formData }: StepProps<StudentData>) {
  return (
    <motion.div
      variants={reviewVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="space-y-6"
    >
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Student Review</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ReviewItem label="Full Name" value={formData.fullName} />
        <ReviewItem label="Email" value={formData.email} />
        <ReviewItem label="Contact Number" value={formData.contactNumber} />
        <ReviewItem label="ID Number" value={formData.idNumber} />
        <ReviewItem label="Institution" value={formData.institution} />
        <ReviewItem label="Campus" value={formData.campus} />
        <ReviewItem
          label="Accommodation"
          value={formData.accommodation}
          className="md:col-span-2"
        />
      </div>
    </motion.div>
  );
}

export function APReview({ formData }: StepProps<APData>) {
  return (
    <motion.div
      variants={reviewVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="space-y-6"
    >
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        Accommodation Provider Review
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ReviewItem label="Property Name" value={formData.propertyName} />
        <ReviewItem label="Contact Number" value={formData.contactNumber} />
        <ReviewItem label="ID Number" value={formData.idNumber} />
      </div>
    </motion.div>
  );
}

export function OtherReview({ formData }: StepProps<OtherData>) {
  return (
    <motion.div
      variants={reviewVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="space-y-6"
    >
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Other Review</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ReviewItem label="Full Name" value={formData.fullName} />
        <ReviewItem label="Email" value={formData.email} />
        <ReviewItem label="Contact Number" value={formData.contactNumber} />
        <ReviewItem label="ID Number" value={formData.idNumber} />
      </div>
    </motion.div>
  );
}

export function QueryReview({ formData }: StepProps<QueryData>) {
  return (
    <motion.div
      variants={reviewVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="space-y-6"
    >
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Query Review</h3>
      <div className="grid grid-cols-1 gap-4">
        <ReviewItem label="Query Type" value={formData.query} />
        <motion.div
          className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm"
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <p className="text-sm text-gray-500 mb-1">Query Description</p>
          <p className="text-gray-900 whitespace-pre-wrap">
            {formData.describeQuery || "Not provided"}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
