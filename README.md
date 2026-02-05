# WMDD-4998 React Navite - Expo - Movies App

Simple mobile application that fetches media informations for movies and TV shows from [TMDB](https://www.themoviedb.orghttps:/). It has 3 main functionalities:

1. View movies (by now playing, popularity, rating, upcoming)
2. View TV Shows (by popularity, on the air, airing today, upcoming)
3. Search for movies or TV shows or both

It will also have a detail screen for each media item that shows more information about the selected movie or TV show.
As for the list of media items, only 20 items are fetched and 10 items are shown per page. Pagination is implemented to navigate between pages.

## Tech Stack

1. React Native - for building mobile applications
2. Expo - for building React Native apps easily
3. React Navigation - for handling navigation between screens
4. React Native Elements - for UI components such as:
    - Cards
    - Buttons
    - Text
5. Axios - for making API requests to TMDB
6. TypeScript - for type safety and better developer experience

## Project Structure

### Directory Structure

- `src/`
    - `components/`
        - `containers/` - components that handle data fetching and state management
        - `listItems/` - components that represent individual items in a list
        - `screens/` - components that represent different screens in the app
        - `stacks/` - stack navigators for different sections of the app
    - `navigation/` - navigation setup and configuration
    - `services/` - API service functions for fetching data from TMDB
    - `types/` - TypeScript type definitions
    - `constants/` - constant values used throughout the app
    - `App.tsx` - main entry point of the application

### Component Hierarchy

Used topdown approach for implementing components such as:

- Navigation (Top Tabs)
- Screens (Movies, TV Shows, Search, Media Detail)
- Containers (MediaListContainer, MediaDetailContainer)
- List Items (MediaCard)

### Navigation

- Used React Navigation's Material Top Tabs for main navigation between Movies, TV Shows, and Search screens
- Used Stack Navigator for navigating from list screens to media detail screen
    - Note: placed navigation related files under src/navigation instead of src/components/stacks for cleaner separation and also can easily migrate to expo router - file based approach later

## Project Installation

### Prerequisites

1. Install node and npm
2. Install expo cli
3. Install Xcode (for iOS simulator) or Android Studio (for Android emulator) - if you plan to run the app on an emulator
4. Install Expo Go app on your physical device (iOS or Android) - if you plan to run the app on a physical device

### Project Setup

1. Clone the repository
2. Navigate to the project directory
3. Run npm install to install dependencies
   `npm install`
   Currently, some dependencies have peer dependency issues. Workaround is to use:
   `npm install --legacy-peer-deps` (if you encounter peer dependency issues)
   Note: The project stores API keys in the config/apiConfig.ts for the purpose of this assignment. Application is not guaranteed to work if owner of API key revokes access.

## Running the app (development mode)

1. Start the development server
   `npm start`
2. Follow the instructions in the terminal to run the app on an emulator or a physical device
    - For iOS: Press 'i' to open in iOS simulator
    - For Android: Press 'a' to open in Android emulator
    - For physical device: Scan the QR code using the Expo Go app
