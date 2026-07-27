import moment from "moment";

export const debounce = (func, delay) => {
  let timeoutId;
  return function (...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

export const toStringDate = (value) => {
  if (!value) return null;
  const res = moment(value)?.format("Do [of] MMMM, YYYY");

  if (!res || res === "1st of January, 1900") {
    return null;
  } else {
    return res;
  }
};

export const formatDateToDateandTimeAMPM = (inputDate) => {
  if (!inputDate) return null;

  // Create a moment object and add 1 hour
  const date = moment(inputDate).add(1, "hour");

  // Format the date
  const formattedDate = date.format("Do MMMM YYYY");

  // Format the time
  const formattedTime = date.format("h:mm A");

  return `${formattedDate}, ${formattedTime}`;
};

export const formatDateToDateandTime = (inputDate) => {
  if (!inputDate) return null;
  const date = moment(inputDate);

  // Format the date
  const formattedDate = date?.format("Do MMMM YYYY");

  return formattedDate;
};

export const formatTimeMeridian = (inputTime) => {
  // Parse the input time
  const [hours, minutes] = inputTime.split(":").map(Number);

  // console.log(inputTime, hours)

  // Determine meridian
  const meridian = hours >= 12 ? "PM" : "AM";

  // Convert to 12-hour format
  let formattedHours = hours % 12;
  formattedHours = formattedHours === 0 ? 12 : formattedHours;

  // Pad minutes with leading zero if necessary
  const formattedMinutes = minutes.toString().padStart(2, "0");

  return {
    time: `${formattedHours + 1}:${formattedMinutes}`,
    meridian: meridian,
  };
};

export function getOrdinalSuffix(day) {
  if (day === 11 || day === 12 || day === 13) {
    return "th";
  } else if (day % 10 === 1) {
    return "st";
  } else if (day % 10 === 2) {
    return "nd";
  } else if (day % 10 === 3) {
    return "rd";
  } else {
    return "th";
  }
}

export function formatDate() {
  const date = new Date();
  const options = {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };
  const formattedDateString = date?.toLocaleString("en-US", options);

  // Add ordinal suffix to the day
  const day = date.getDate();
  const ordinalSuffix = getOrdinalSuffix(day);
  const formatted = formattedDateString?.replace(
    /\b\d{1,2}\b/,
    `$&${ordinalSuffix}`
  );
  return formatted;
}

export const removeHTMLTagsAndStyles = (html) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  const textWithStyles = Array.from(doc.body.childNodes)
    .map((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent;
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const styles = Array.from(node.style)
          .map((prop) => `${prop}: ${node.style[prop]}`)
          .join("; ");
        return `<span style="${styles}">${node.textContent}</span>`;
      }
      return "";
    })
    .join("");
  return textWithStyles;
};

export const convertBase64ToFile = (
  base64String,
  fileName = "image.png",
  fileType = "image/png"
) => {
  // Remove the data URL prefix if present
  const base64WithoutPrefix = base64String.replace(
    /^data:image\/\w+;base64,/,
    ""
  );

  // Convert base64 to binary
  const binaryString = atob(base64WithoutPrefix);

  // Create an array buffer from the binary string
  const buffer = new ArrayBuffer(binaryString.length);
  const view = new Uint8Array(buffer);
  for (let i = 0; i < binaryString.length; i++) {
    view[i] = binaryString.charCodeAt(i);
  }

  // Create a Blob from the array buffer
  const blob = new Blob([buffer], { type: fileType });

  // Create a File object from the Blob
  return new File([blob], fileName, { type: fileType });
};

export const dataURLToFile = (dataUrl, filename) => {
  const arr = dataUrl.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
};

export function formatToJSON(inputString) {
  // Split the input string into its components
  const parts = inputString.match(/(\d+)\s+(\d{4}-\d{2}-\d{2})(\{.*\})/);

  if (!parts || parts.length !== 4) {
    throw new Error("Input string is not in the expected format");
  }

  const timestamp = parseInt(parts[1], 10);
  const date = parts[2];
  const dataString = parts[3];

  // Parse the JSON string to an object
  let data;
  try {
    data = JSON.parse(dataString);
  } catch (error) {
    throw new Error("Invalid JSON object in input string");
  }

  // Construct the JSON object
  const jsonObject = {
    timestamp: timestamp,
    date: date,
    data: data,
  };

  return jsonObject;
}

export const downloadFile = async (url, fileName, fileType) => {
  try {
    // Fetch the file
    const response = await fetch(url);

    if (!response.ok) {
      // throw new Error(`HTTP error! status: ${response.status}`);
      onDocClick(url, fileName);
    }

    // Get the blob from the response
    const blob = await response.blob();

    // Create a new blob with the correct MIME type if provided
    const file = fileType ? new Blob([blob], { type: fileType }) : blob;

    // Create a URL for the blob
    const blobUrl = window.URL.createObjectURL(file);

    // Create a temporary anchor element
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = fileName;

    // Append to the document, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up the blob URL
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("Download failed:", error);
  }
};

const onDocClick = (url, name) => {
  try {
    const pdfUrl = url;
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.setAttribute("target", "_blank");
    link.download = name; // specify the filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Download failed:", error);
  }
};

export const diffinDuration = (TIME_REQUESTED, TIME_TREATED) => {
  // Parse the date strings using moment
  const requested = moment(TIME_REQUESTED, "YYYY-MM-DD HH:mm:ss.SSS");
  const treated = moment(TIME_TREATED, "YYYY-MM-DD HH:mm:ss.SSS");

  // Calculate the difference in milliseconds
  const difference = treated.diff(requested);

  // Convert the difference to a duration
  const duration = moment.duration(difference);

  // Format the duration as hours and minutes
  const hours = Math.floor(duration.asHours()); // Get total hours
  const minutes = duration.minutes(); // Get remaining minutes
  let formattedDuration;

  if (hours) {
    formattedDuration = `${hours} hours ${minutes} mins`;
  } else {
    formattedDuration = `${minutes || 1} mins`;
  }

  // console.log(formattedDuration)
  return formattedDuration;

  // console.log(formattedDuration);
};

export const durationDiff = (TIME_REQUESTED, TIME_TREATED) => {
  // Parse the date strings using moment
  const requested = moment(TIME_REQUESTED, "YYYY-MM-DD HH:mm:ss.SSS");
  const treated = moment(TIME_TREATED, "YYYY-MM-DD HH:mm:ss.SSS");

  // Calculate the difference in milliseconds
  const difference = treated.diff(requested);

  // Convert the difference to a duration
  const duration = moment.duration(difference);

  // Extract each time component
  const months = duration.months();
  const days = duration.days();
  const hours = Math.floor(duration.asHours() % 24);
  const minutes = duration.minutes();
  const seconds = duration.seconds();

  // Build the formatted string dynamically
  let formattedDuration = "";

  if (months > 0) {
    formattedDuration += ` ${months} month${months > 1 ? "s" : ""} `;
  }

  if (days > 0) {
    formattedDuration += ` ${days} day${days > 1 ? "s" : ""} `;
  }

  if (hours > 0) {
    formattedDuration += ` ${hours} hour${hours > 1 ? "s" : ""} `;
  }

  if (minutes > 0) {
    formattedDuration += ` ${minutes} min${minutes > 1 ? "s" : ""}`;
  }
  if (seconds > 0) {
    formattedDuration += ` ${seconds} sec${seconds > 1 ? "s" : ""}`;
  }

  return formattedDuration ? formattedDuration.trim() : "Immediate";
};

export function formatNumberWithComma(value) {
  return Number(value)?.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export const truncateFileName = (filename, maxLength = 20) => {
  if (!filename) return "";

  const extensionIndex = filename.lastIndexOf(".");
  const name = filename.slice(0, extensionIndex);
  const extension = filename.slice(extensionIndex);

  if (filename.length <= maxLength) return filename;

  const truncatedName = name.slice(0, maxLength - extension.length - 3) + "...";
  return `${truncatedName}${extension}`;
};

// Utility function to check loan applications
export const hasAppliedThisMonth = (loanData) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getUTCMonth(); // 0-11 (January-December)
  const currentYear = currentDate.getUTCFullYear();

  return loanData?.some((loan) => {
    const loanDate = new Date(loan.CREATED_ON);
    return (
      loanDate.getUTCFullYear() === currentYear &&
      loanDate.getUTCMonth() === currentMonth &&
      loan.STATUS === "Approved"
    );
  });
};

export const formatNaira = (amount) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  }).format(parseFloat(amount));
};
