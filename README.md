# Yahtzee Dice Roller

A small web application that rolls five 6-sided dice for a game of Yahtzee.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Page structure, instructions, dice fields, and Roll button |
| `styles.css` | All presentation (felt-table theme, dice faces, layout) |
| `script.js` | Random number generation and updating the read-only fields |

## Features

- Rolls automatically when the page loads (`<body onload="rollDice()">`).
- The **Roll Dice** button is focused on load (`autofocus`), so pressing **Enter** rolls again.
- Each die has a meaningful heading (Die 1 – Die 5) plus summary headings for
  Total of Dice, Highest Die, and Rolls This Session.
- Every random value is shown in a `readonly` input that is right justified.
- Random values come from `Math.random()`, producing 1–6 for each die.

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy to Microsoft Azure (Static Web Apps)

1. Push this folder to a GitHub repository.
2. In the Azure portal choose **Create a resource → Static Web App**.
3. Set **Deployment source** to GitHub and pick the repository and branch.
4. Under **Build Details**, choose build preset **Custom**, set
   **App location** to `/`, leave **Api location** empty, and leave
   **Output location** empty (the site is plain HTML/CSS/JS, no build step).
5. Click **Review + create**. Azure adds a GitHub Actions workflow that
   publishes the site and gives you a URL like
   `https://<name>.azurestaticapps.net`.

Alternative with the Azure CLI:

```bash
az staticwebapp create \
  --name yahtzee-dice-roller \
  --resource-group <your-resource-group> \
  --source https://github.com/<user>/<repo> \
  --branch main \
  --app-location "/" \
  --login-with-github
```
