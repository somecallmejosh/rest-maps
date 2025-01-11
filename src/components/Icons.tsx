interface Props {
  className?: string;
}

export const BackArrowIcon: React.FC<Props> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.46447 4.10744L7.64298 5.28596L3.75389 9.17504L18.6031 9.17504L18.6031 10.825L3.75389 10.825L7.64298 14.714L6.46447 15.8926L0.57191 10L6.46447 4.10744Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const ChevronDownIcon: React.FC<Props> = ({ className }) => {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g id="Group 2">
        <g id="expand-more">
          <path
            id="Shape"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.45 3.45L6 6.9L2.55 3.45L1.5 4.5L6 9L10.5 4.5L9.45 3.45Z"
            fill="currentColor"
          />
        </g>
      </g>
    </svg>
  );
};

export const FrownyFaceIcon: React.FC<Props> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
      viewBox="0 0 64 64"
      className={className}
    >
      <path
        fill="currentColor"
        d="M32 2C15.432 2 2 15.432 2 32s13.432 30 30 30s30-13.432 30-30S48.568 2 32 2m0 57.5C16.836 59.5 4.5 47.164 4.5 32S16.836 4.5 32 4.5S59.5 16.836 59.5 32S47.164 59.5 32 59.5"
      />
      <path
        fill="currentColor"
        d="M23.992 19.865c.541-.469-.971-2.061-1.414-1.674a14.23 14.23 0 0 1-11.693 3.133c-.578-.113-1.088 2.021-.385 2.156c4.809.864 9.756-.46 13.492-3.615m29.121 1.307c-4.168.748-8.455-.4-11.691-3.133c-.443-.389-1.955 1.205-1.412 1.674a16.42 16.42 0 0 0 13.492 3.615c.703-.135.191-2.269-.389-2.156m-6.547 21.224c-.535-.629-1.533-.768-2.219-.309L40.1 44.928c-.686.459-1.758.394-2.383-.146l-4.582-3.947c-.625-.538-1.648-.537-2.273.001l-4.563 3.938c-.625.538-1.697.604-2.383.146l-4.262-2.847c-.686-.458-1.686-.318-2.219.31l-4.463 5.251c-.535.628-.381.816.342.418l3.775-2.082c.723-.398 1.797-.253 2.387.323l4.627 4.516c.59.576 1.609.638 2.264.136l4.465-3.42c.654-.502 1.727-.502 2.383 0l4.443 3.402c.654.502 1.674.44 2.264-.137l4.6-4.494c.59-.577 1.664-.723 2.387-.325l3.779 2.082c.723.397.875.21.34-.419zM43.248 31.55c2.709-1.5 5.563-1.958 8.256-2.361a.584.584 0 0 0 .166-1.094c-5.697-3.397-14.963-.679-16.609 6.525c-.104.446.314.728.801.678c6.168-.634 11.074.304 15.846 2.036c.443.161.938-.481.543-.955c-1.753-2.1-4.981-4.162-9.003-4.829m-15.107 3.748c.486.05.902-.231.801-.678c-1.646-7.204-10.912-9.923-16.611-6.525a.584.584 0 0 0 .168 1.094c2.693.403 5.547.861 8.256 2.361c-4.021.667-7.25 2.729-9.002 4.829c-.396.474.1 1.116.541.955c4.772-1.732 9.679-2.67 15.847-2.036"
      />
    </svg>
  );
};

export const GlobeIcon: React.FC<Props> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
      />
    </svg>
  );
};

export const LoadingIcon: React.FC<Props> = ({ className }) => {
  return (
    <div className="mx-auto flex w-full max-w-[1280px] items-center gap-1 px-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={`${className} size-6 animate-spin`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
        />
      </svg>
      Loading...
    </div>
  );
};

export const MoonIcon: React.FC<Props> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.5532 13.815C9.66857 13.815 6.51929 10.9278 6.51929 7.36821C6.51929 6.0253 6.96679 4.78158 7.73143 3.75C4.69036 4.69515 2.5 7.33122 2.5 10.4381C2.5 14.3385 5.94929 17.5 10.2036 17.5C13.5929 17.5 16.4696 15.4932 17.5 12.7045C16.375 13.4048 15.0161 13.815 13.5532 13.815Z"
        fill="white"
        stroke="#111517"
        strokeWidth="1.25"
      />
    </svg>
  );
};

export const SearchIcon: React.FC<Props> = ({ className }) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g id="search">
        <path
          id="Shape"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.5 11H11.7L11.4 10.7C12.4 9.6 13 8.1 13 6.5C13 2.9 10.1 0 6.5 0C2.9 0 0 2.9 0 6.5C0 10.1 2.9 13 6.5 13C8.1 13 9.6 12.4 10.7 11.4L11 11.7V12.5L16 17.5L17.5 16L12.5 11ZM6.5 11C4 11 2 9 2 6.5C2 4 4 2 6.5 2C9 2 11 4 11 6.5C11 9 9 11 6.5 11Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
};

export const SunIcon: React.FC<Props> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
      />
    </svg>
  );
};
