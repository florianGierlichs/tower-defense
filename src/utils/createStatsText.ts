export const createStatsText = (
  container: HTMLDivElement,
  key: string,
  value?: string
) => {
  const p = document.createElement("p");
  p.classList.add("tower-stats-text");

  const keyEl = document.createElement("span");
  keyEl.classList.add("tower-stats-text-key");
  keyEl.innerHTML = key;
  p.appendChild(keyEl);

  if (value !== undefined) {
    const valueEl = document.createElement("span");
    valueEl.classList.add("tower-stats-text-value");
    valueEl.innerHTML = value;
    p.appendChild(valueEl);
  }
  container.appendChild(p);
};
