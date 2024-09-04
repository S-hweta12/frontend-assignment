
# Frontend

## Installation

Make sure you're running node version 20 or above

```sh 
git clone [url](https://github.com/S-hweta12/frontend-assignment)
yarn install
yarn run dev
```

## Thought Process

* API - Implemented endpoints for bulk data update, retrieval, and initial posting of data.

* Data Persistence - Used local storage to persist data. Initially fetches data if it is not present in local storage, retrieves and uses existing data otherwise.

* Images drag and drop - Images in the gallery can be easily reordered by dragging and dropping them onto each other.

* Auto save - An API runs within every 5 seconds to save data.

* Last updated timestamp - The last update time is tracked in local storage and updated with each API save call. This timestamp is also returned by the initial posting API for reference.