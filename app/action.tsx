"use server"

export async function submitContactForm(formData: FormData) {
  try {
    const firstName = formData.get("firstName")?.toString().trim()
    const lastName = formData.get("lastName")?.toString().trim()
    const email = formData.get("email")?.toString().trim()
    const subject = formData.get("subject")?.toString().trim()
    const message = formData.get("message")?.toString().trim()

    // Validation
    if (!firstName || !lastName || !email || !subject || !message) {
      return {
        success: false,
        message: "All fields are required.",
      }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return {
        success: false,
        message: "Please enter a valid email address.",
      }
    }

    // Example logging (replace with actual email/database logic)
    console.log("Contact Form Submitted:", {
      firstName,
      lastName,
      email,
      subject,
      message,
    })

    // TODO:
    // Integrate email service like:
    // - :contentReference[oaicite:1]{index=1}
    // - :contentReference[oaicite:2]{index=2}
    // - :contentReference[oaicite:3]{index=3}

    return {
      success: true,
      message: `Thank you ${firstName}! Your message has been sent successfully.`,
    }

  } catch (error) {
    console.error("Form submission error:", error)

    return {
      success: false,
      message: "Something went wrong. Please try again.",
    }
  }
}