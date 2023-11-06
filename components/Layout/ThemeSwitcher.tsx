"use client";

import { Switch } from "@nextui-org/react";
import { Moon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <span className="w-full flex">
      Dark Mode
      <Switch
        onValueChange={(value) =>
          value ? setTheme("dark") : setTheme("light")
        }
        defaultSelected={theme === "dark"}
        size="sm"
        color="primary"
        className="ml-auto"
        thumbIcon={({ isSelected, className }) =>
          isSelected ? (
            <SunIcon className={className} />
          ) : (
            <MoonIcon className={className} />
          )
        }
      />
    </span>
  );
}
