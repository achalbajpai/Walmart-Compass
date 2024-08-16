
---

# Walmart Compass

Walmart Compass is a Next.js web application that allows users to find products on Walmart by either uploading an image or entering a product name. It features a dark mode/light mode toggle and a product suggestion dropdown.

## Features

- **Image Upload:** Users can upload an image to search for products.
- **Product Name Search:** Enter a product name to get suggestions from a predefined list.
- **Dark Mode/Light Mode Toggle:** Switch between dark and light themes.
- **Product Suggestions:** Get product suggestions as you type.

## Technologies Used

- Next.js
- TypeScript
- React
- Tailwind CSS

## Getting Started

To run the project locally, follow these steps:

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/) (npm comes with Node.js)

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/walmart-compass.git
   cd walmart-compass
   ```

2. **Install Dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the Development Server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Open your browser and navigate to `http://localhost:3000` to see the application.

## Configuration

- **Images:** Ensure you have the following images in the `public` folder:
  - `walmart.png` (for the Walmart logo in the header)
  - `instructions.jpeg` (for the instructional image on how to scan an image)

- **Dark Mode:** The dark mode is toggled using a button in the header.

## File Structure

- `pages.tsx`: Main component file for the homepage.
- `public/`: Folder for static assets such as images.
- `styles/`: Contains any global styles or Tailwind CSS configuration.

## Contributing

Feel free to fork the repository and make a pull request. If you find any bugs or have feature requests, please open an issue.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or inquiries

---

Feel free to adjust any details as needed!
