import { twMerge } from "tailwind-merge";

type Props = {
  seed: string;
  className?: string;
};

export const Avatar = ({ seed, className }: Props) => {
  const url = `https://api.dicebear.com/6.x/thumbs/svg?seed=${seed}&flip=true`;

  return (
    <img
      alt="avatar"
      className={twMerge("h-16 w-16 rounded-xl", className)}
      src={url}
    />
  );
};
