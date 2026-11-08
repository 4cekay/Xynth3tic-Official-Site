// Reference: same sources as webstore.js, just modified to fit the discography displays (instead of products)

// function for loading in the releases in the JSON file
async function getReleases() {
  const response = await fetch("./discography.json");
  const release_list = await response.json();

  return release_list.releases;
}

// function for conditionally displaying selected product
async function showSelectedRelease() {
  const display = document.getElementById("release-content");

  // fetch specific ID from URL parameters
  const releaseID = new URLSearchParams(window.location.search).get("id");

  // search for release with matching ID
  const release_list = await getReleases();
  const selected = release_list.find((item) => item.id === releaseID);

  // insert release specs into their elements
  document.getElementById("release-name").textContent = selected.name;
  document.getElementById("release-date").textContent = selected.date;
  document.getElementById("release-type").textContent = selected.type;
  document.getElementById("release-duration").textContent = selected.duration;
  document.getElementById("release-desc").textContent = selected.description;

  // display tracklist by iterating through array and appending list elements
  // Reference: https://stackoverflow.com/questions/69588190/how-do-i-add-child-li-elements-to-ul-without-removing-current-children
  const tracklist = selected.tracklist;

  let i = 0;
  while (i < tracklist.length) {
    const current_track = tracklist[i];

    // Source - https://stackoverflow.com/a/69588250
    // Posted by Manas Khandelwal
    // Retrieved 2026-11-08, License - CC BY-SA 4.0
    document.getElementById("release-tracks").innerHTML +=
      `<li class="track-name">${i + 1}. ${current_track}</li>`;

    i++;
  }

  // display full release details once all info is loaded in
  display.hidden = false;
}

showSelectedRelease();
