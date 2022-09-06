/* eslint-disable @typescript-eslint/no-empty-function */
import { TimerSettings } from "@prisma/client";
import React from "react";
import { BsToggleOff, BsToggleOn } from "react-icons/bs";
import isNumber from "../utils/is-number";
import alertError from "../utils/alert-error";

export const TimerSettingsComponent: React.FC<{
  timerSettings: TimerSettings | undefined;
  setTimerSettings: React.Dispatch<
    React.SetStateAction<TimerSettings | undefined>
  >;
}> = ({ setTimerSettings, timerSettings }) => {
  return (
    <>
      <div className="w-full overflow-hidden rounded-md border border-stone-700">
        <div className="flex w-full items-center justify-center gap-4 bg-stone-900 py-1">
          <h3 className="inline-block text-center text-xl font-semibold text-white">
            Donations
          </h3>
          <span
            onClick={() => {
              setTimerSettings((prevState) => {
                return {
                  ...prevState,
                  donationsOn: !prevState?.donationsOn,
                } as TimerSettings;
              });
            }}
            className="flex h-full items-center"
          >
            {timerSettings?.donationsOn ? (
              <BsToggleOn className="inline-block h-8 w-8 items-start text-blue-500" />
            ) : (
              <BsToggleOff className="inline-block h-8 w-8 items-start text-white" />
            )}
          </span>
        </div>
        <div className="flex w-full justify-center gap-3 py-7 px-2 text-white">
          <h4 className="font-medium">Per</h4>
          <input
            type="text"
            className="h-min w-24 border-b-2 bg-transparent text-end focus-visible:border-blue-500 focus-visible:outline-none"
            value={timerSettings?.perDonation}
            onChange={(e) => {
              if (!isNumber(e.target.value)) {
                alertError("You can't type letters here.");
                return;
              }

              setTimerSettings((prevState) => {
                return {
                  ...prevState,
                  perDonation: parseInt(e.target.value),
                } as TimerSettings;
              });
            }}
          />
          <h4 className="font-medium">dollars do</h4>
          <input
            type="text"
            className="h-min w-24 border-b-2 bg-transparent text-end focus-visible:border-blue-500 focus-visible:outline-none"
            value={timerSettings?.secondsDonation}
            onChange={(e) => {
              if (!isNumber(e.target.value)) {
                alertError("You can't type letters here.");
                return;
              }

              setTimerSettings((prevState) => {
                return {
                  ...prevState,
                  secondsDonation: parseInt(e.target.value),
                } as TimerSettings;
              });
            }}
          />
          <h4 className="font-medium">seconds.</h4>
        </div>
      </div>
      <div className="w-full overflow-hidden rounded-md border border-stone-700">
        <div className="flex w-full items-center justify-center gap-4 bg-stone-900 py-1">
          <h3 className="inline-block text-center text-xl font-semibold text-white">
            Superchat
          </h3>
          <span
            onClick={() => {
              setTimerSettings((prevState) => {
                return {
                  ...prevState,
                  superchatOn: !prevState?.superchatOn,
                } as TimerSettings;
              });
            }}
            className="flex h-full items-center"
          >
            {timerSettings?.superchatOn ? (
              <BsToggleOn className="inline-block h-8 w-8 items-start text-blue-500" />
            ) : (
              <BsToggleOff className="inline-block h-8 w-8 items-start text-white" />
            )}
          </span>
        </div>
        <div className="flex w-full justify-center gap-3 py-7 px-2 text-white">
          <h4 className="font-medium">Per</h4>
          <input
            type="text"
            className="h-min w-24 border-b-2 bg-transparent text-end focus-visible:border-blue-500 focus-visible:outline-none"
            value={timerSettings?.perSuperchat}
            onChange={(e) => {
              if (!isNumber(e.target.value)) {
                alertError("You can't type letters here.");
                return;
              }

              setTimerSettings((prevState) => {
                return {
                  ...prevState,
                  perSuperchat: parseInt(e.target.value),
                } as TimerSettings;
              });
            }}
          />
          <h4 className="font-medium">dollars do</h4>
          <input
            type="text"
            className="h-min w-24 border-b-2 bg-transparent text-end focus-visible:border-blue-500 focus-visible:outline-none"
            value={timerSettings?.secondsSuperchat}
            onChange={(e) => {
              if (!isNumber(e.target.value)) {
                alertError("You can't type letters here.");
                return;
              }

              setTimerSettings((prevState) => {
                return {
                  ...prevState,
                  secondsSuperchat: parseInt(e.target.value),
                } as TimerSettings;
              });
            }}
          />
          <h4 className="font-medium">seconds.</h4>
        </div>
      </div>
      <div className="w-full overflow-hidden rounded-md border border-stone-700">
        <div className="flex w-full items-center justify-center gap-4 bg-stone-900 py-1">
          <h3 className="inline-block text-center text-xl font-semibold text-white">
            Subscribers
          </h3>
          <span
            onClick={() => {
              setTimerSettings((prevState) => {
                return {
                  ...prevState,
                  subscribersOn: !prevState?.subscribersOn,
                } as TimerSettings;
              });
            }}
            className="flex h-full items-center"
          >
            {timerSettings?.subscribersOn ? (
              <BsToggleOn className="inline-block h-8 w-8 items-start text-blue-500" />
            ) : (
              <BsToggleOff className="inline-block h-8 w-8 items-start text-white" />
            )}
          </span>
        </div>
        <div className="flex w-full justify-center gap-3 py-7 px-2 text-white">
          <h4 className="font-medium">Per subscriber do</h4>
          <input
            type="text"
            className="h-min w-24 border-b-2 bg-transparent text-end focus-visible:border-blue-500 focus-visible:outline-none"
            value={timerSettings?.secondsSubscriber}
            onChange={(e) => {
              if (!isNumber(e.target.value)) {
                alertError("You can't type letters here.");
                return;
              }

              setTimerSettings((prevState) => {
                return {
                  ...prevState,
                  secondsSubscriber: parseInt(e.target.value),
                } as TimerSettings;
              });
            }}
          />
          <h4 className="font-medium">seconds.</h4>
        </div>
      </div>
      <div className="w-full overflow-hidden rounded-md border border-stone-700">
        <div className="flex w-full items-center justify-center gap-4 bg-stone-900 py-1">
          <h3 className="inline-block text-center text-xl font-semibold text-white">
            Members
          </h3>
          <span
            onClick={() => {
              setTimerSettings((prevState) => {
                return {
                  ...prevState,
                  membersOn: !prevState?.membersOn,
                } as TimerSettings;
              });
            }}
            className="flex h-full items-center"
          >
            {timerSettings?.membersOn ? (
              <BsToggleOn className="inline-block h-8 w-8 items-start text-blue-500" />
            ) : (
              <BsToggleOff className="inline-block h-8 w-8 items-start text-white" />
            )}
          </span>
        </div>
        <div className="flex w-full flex-col justify-center gap-5 py-7 px-2 font-medium text-white">
          <div className="flex justify-center gap-3 text-white">
            <h3>1 Name: </h3>
            <input
              type="text"
              className="h-min border-b-2 bg-transparent text-end focus-visible:border-blue-500 focus-visible:outline-none"
              value={timerSettings?.member1Name}
              onChange={(e) => {
                setTimerSettings((prevState) => {
                  return {
                    ...prevState,
                    member1Name: e.target.value,
                  } as TimerSettings;
                });
              }}
            />
            <h3>Seconds: </h3>
            <input
              type="text"
              className="h-min w-24 border-b-2 bg-transparent text-end focus-visible:border-blue-500 focus-visible:outline-none"
              value={timerSettings?.member1Secoonds}
              onChange={(e) => {
                if (!isNumber(e.target.value)) {
                  alertError("You can't type letters here.");
                  return;
                }

                setTimerSettings((prevState) => {
                  return {
                    ...prevState,
                    member1Secoonds: parseInt(e.target.value),
                  } as TimerSettings;
                });
              }}
            />
          </div>
          <div className="flex justify-center gap-3 text-white">
            <h3>2 Name: </h3>
            <input
              type="text"
              className="h-min border-b-2 bg-transparent text-end focus-visible:border-blue-500 focus-visible:outline-none"
              value={timerSettings?.member2Name}
              onChange={(e) => {
                setTimerSettings((prevState) => {
                  return {
                    ...prevState,
                    member2Name: e.target.value,
                  } as TimerSettings;
                });
              }}
            />
            <h3>Seconds: </h3>
            <input
              type="text"
              className="h-min w-24 border-b-2 bg-transparent text-end focus-visible:border-blue-500 focus-visible:outline-none"
              value={timerSettings?.member2Secoonds}
              onChange={(e) => {
                if (!isNumber(e.target.value)) {
                  alertError("You can't type letters here.");
                  return;
                }

                setTimerSettings((prevState) => {
                  return {
                    ...prevState,
                    member2Secoonds: parseInt(e.target.value),
                  } as TimerSettings;
                });
              }}
            />
          </div>
          <div className="flex justify-center gap-3 text-white">
            <h3>3 Name: </h3>
            <input
              type="text"
              className="h-min border-b-2 bg-transparent text-end focus-visible:border-blue-500 focus-visible:outline-none"
              value={timerSettings?.member3Name}
              onChange={(e) => {
                setTimerSettings((prevState) => {
                  return {
                    ...prevState,
                    member3Name: e.target.value,
                  } as TimerSettings;
                });
              }}
            />
            <h3>Seconds: </h3>
            <input
              type="text"
              className="h-min w-24 border-b-2 bg-transparent text-end focus-visible:border-blue-500 focus-visible:outline-none"
              value={timerSettings?.member3Secoonds}
              onChange={(e) => {
                if (!isNumber(e.target.value)) {
                  alertError("You can't type letters here.");
                  return;
                }

                setTimerSettings((prevState) => {
                  return {
                    ...prevState,
                    member3Secoonds: parseInt(e.target.value),
                  } as TimerSettings;
                });
              }}
            />
          </div>
          <div className="flex justify-center gap-3 text-white">
            <h3>4 Name: </h3>
            <input
              type="text"
              className="h-min border-b-2 bg-transparent text-end focus-visible:border-blue-500 focus-visible:outline-none"
              value={timerSettings?.member4Name}
              onChange={(e) => {
                setTimerSettings((prevState) => {
                  return {
                    ...prevState,
                    member4Name: e.target.value,
                  } as TimerSettings;
                });
              }}
            />
            <h3>Seconds: </h3>
            <input
              type="text"
              className="h-min w-24 border-b-2 bg-transparent text-end focus-visible:border-blue-500 focus-visible:outline-none"
              value={timerSettings?.member4Secoonds}
              onChange={(e) => {
                if (!isNumber(e.target.value)) {
                  alertError("You can't type letters here.");
                  return;
                }

                setTimerSettings((prevState) => {
                  return {
                    ...prevState,
                    member4Secoonds: parseInt(e.target.value),
                  } as TimerSettings;
                });
              }}
            />
          </div>
          <div className="flex justify-center gap-3 text-white">
            <h3>5 Name: </h3>
            <input
              type="text"
              className="h-min border-b-2 bg-transparent text-end focus-visible:border-blue-500 focus-visible:outline-none"
              value={timerSettings?.member5Name}
              onChange={(e) => {
                setTimerSettings((prevState) => {
                  return {
                    ...prevState,
                    member5Name: e.target.value,
                  } as TimerSettings;
                });
              }}
            />
            <h3>Seconds: </h3>
            <input
              type="text"
              className="h-min w-24 border-b-2 bg-transparent text-end focus-visible:border-blue-500 focus-visible:outline-none"
              value={timerSettings?.member5Secoonds}
              onChange={(e) => {
                if (!isNumber(e.target.value)) {
                  alertError("You can't type letters here.");
                  return;
                }

                setTimerSettings((prevState) => {
                  return {
                    ...prevState,
                    member5Secoonds: parseInt(e.target.value),
                  } as TimerSettings;
                });
              }}
            />
          </div>
          <div className="flex justify-center gap-3 text-white">
            <h3>6 Name: </h3>
            <input
              type="text"
              className="h-min border-b-2 bg-transparent text-end focus-visible:border-blue-500 focus-visible:outline-none"
              value={timerSettings?.member6Name}
              onChange={(e) => {
                setTimerSettings((prevState) => {
                  return {
                    ...prevState,
                    member6Name: e.target.value,
                  } as TimerSettings;
                });
              }}
            />
            <h3>Seconds: </h3>
            <input
              type="text"
              className="h-min w-24 border-b-2 bg-transparent text-end focus-visible:border-blue-500 focus-visible:outline-none"
              value={timerSettings?.member6Secoonds}
              onChange={(e) => {
                if (!isNumber(e.target.value)) {
                  alertError("You can't type letters here.");
                  return;
                }

                setTimerSettings((prevState) => {
                  return {
                    ...prevState,
                    member6Secoonds: parseInt(e.target.value),
                  } as TimerSettings;
                });
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};
