import { colors } from "./ChatWidget/config";

export const styles = {
    chatWidget: {
        // Position
        position: "fixed",
        bottom: "20px",
        right: "20px",
        backgroundColor: colors.primary,
        // Padding
        paddingLeft: "18px",
        paddingRight: "18px",
        paddingTop: "7px",
        paddingBottom: "7px",
        // Border
        borderRadius: "10px",
        cursor: "pointer",
         // Responsive width for smaller screens
    width: "auto", // Automatically adjust width based on content
    maxWidth: "300px", // Max width on larger screens
    fontSize: "16px", // Adjust font size for better mobile appearance
    },

    chatWidgetText: {
        color: "white",
        fontSize: "18px",
        marginLeft: "5px",
        fontWeight: "bold",
         // Adjust text size for mobile
    fontSize: "16px",
    },

    // Styling for model window 
    modalWindow: {
        // Position
        position: "fixed",
        bottom: "70px",
        right: "20px",
        // Size
        // width: "370px",
        width: "420px",
        height: "59vh",
        // height: "25vh",
        maxWidth: "calc(100% - 48px)",
        maxHeight: "calc(100% - 48px)",
        backgroundColor: " #1e1e1e",
        // Border
        borderRadius: "12px",
        border: `2px solid ${colors.primary}`,
        overflow: "hidden",
        // Shadow
        boxShadow: "0px 0px 16px 6px rgba(0, 0, 0, 0.33)",
    },
    chatcontainer: {

    },
     // Media query for mobile devices
  '@media (max-width: 600px)': {
    chatWidget: {
      bottom: "10px",
      right: "10px",
      paddingLeft: "12px",
      paddingRight: "12px",
      paddingTop: "5px",
      paddingBottom: "5px",
      width: "auto",
      maxWidth: "150px", // Reduce size on mobile
    },

    chatWidgetText: {
      fontSize: "14px", // Smaller text on mobile
    },

    modalWindow: {
      width: "90%", // Full width on small screens
      height: "45vh", // Smaller height on mobile
      bottom: "60px", // Adjust position for mobile
    },
    chatcontainer: {
        // Make chat container more flexible
        width: "100%", // Full width of the parent
        maxWidth: "100%", // Prevent overflow
        height: "100%", // Take up all available height
        padding: "10px",
      },
  },

  // Media query for extra small devices (phones, small iPhones)
'@media (max-width: 480px)': {
    chatWidget: {
        bottom: "10px",
        right: "10px",
        paddingLeft: "12px",
        paddingRight: "12px",
        paddingTop: "5px",
        paddingBottom: "5px",
        width: "auto",
        maxWidth: "120px", // Further reduce size on very small screens
    },
    chatWidgetText: {
        fontSize: "12px", // Even smaller text for extra small screens
    },
    modalWindow: {
        width: "90%", // Full width on small screens
        height: "40vh", // Smaller height on very small screens
        bottom: "50px", // Adjust position
    },
    chatcontainer: {
        width: "100%", // Full width
        maxWidth: "100%", // Prevent overflow
        height: "100%", // Take up all available height
        padding: "8px", // Reduced padding for small screens
    },
},

// Media query for small mobile devices (iPhone 5/SE, Android phones)
'@media (max-width: 600px)': {
    chatWidget: {
        bottom: "10px",
        right: "10px",
        paddingLeft: "12px",
        paddingRight: "12px",
        paddingTop: "5px",
        paddingBottom: "5px",
        width: "auto",
        maxWidth: "150px", // Reduce size on mobile
    },
    chatWidgetText: {
        fontSize: "14px", // Smaller text on mobile
    },
    modalWindow: {
        width: "90%", // Full width on small screens
        height: "45vh", // Smaller height on mobile
        bottom: "60px", // Adjust position for mobile
    },
    chatcontainer: {
        width: "100%", // Full width of the parent
        maxWidth: "100%", // Prevent overflow
        height: "100%", // Take up all available height
        padding: "10px",
    },
},

// Media query for tablets (portrait mode, e.g., iPad)
'@media (max-width: 768px)': {
    chatWidget: {
        bottom: "15px",
        right: "15px",
        paddingLeft: "14px",
        paddingRight: "14px",
        paddingTop: "6px",
        paddingBottom: "6px",
        width: "auto",
        maxWidth: "200px", // Adjust size for tablets
    },
    chatWidgetText: {
        fontSize: "16px", // Adjust font size for tablet screens
    },
    modalWindow: {
        width: "80%", // Reduce width on tablets
        height: "50vh", // Increase height for better display
        bottom: "70px", // Adjust position for tablet screens
    },
    chatcontainer: {
        width: "100%", // Full width of the parent
        maxWidth: "100%", // Prevent overflow
        height: "100%", // Take up all available height
        padding: "12px", // Adjust padding for larger screens
    },
},

// Media query for larger tablets (landscape mode, etc.)
'@media (max-width: 1024px)': {
    chatWidget: {
        bottom: "20px",
        right: "20px",
        paddingLeft: "16px",
        paddingRight: "16px",
        paddingTop: "7px",
        paddingBottom: "7px",
        width: "auto",
        maxWidth: "250px", // Larger size on larger tablets
    },
    chatWidgetText: {
        fontSize: "18px", // Larger text for larger devices
    },
    modalWindow: {
        width: "70%", // More room on larger screens
        height: "55vh", // Slightly larger height for better display
        bottom: "80px", // Adjust position for larger tablets
    },
    chatcontainer: {
        width: "100%",
        maxWidth: "100%",
        height: "100%",
        padding: "14px", // Adjust padding further
    },
},

}
