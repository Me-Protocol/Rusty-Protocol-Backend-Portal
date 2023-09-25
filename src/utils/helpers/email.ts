export const emailButton = ({ url, text }: { url: string; text: string }) => {
  return `
     <div class="x-between">
          <a class="btn black" href=${url}> ${text} </a>
        </div>
  `;
};

export const emailCode = ({ code }: { code: string }) => {
  return `<div class="x-between">
          <div class="otp">${code}</div>
        </div>`;
};