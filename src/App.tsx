import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BitcoinIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LucideGithub, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
// import { isAddress } from "web3-validator";
import * as bitcoin from "bitcoinjs-lib";
import BeatLoader from "react-spinners/BeatLoader";
import "./App.css";
import { useState, useEffect, useCallback } from "react";
import URL from "./env.ts";

const CLIENT_ID = "Iv23liAQdUtyqOxndxIa";

function isBitcoinAddress(address: string) {
  try {
    bitcoin.address.fromBech32(address);
  } catch (e) {
    try {
      bitcoin.address.toOutputScript(address, bitcoin.networks.testnet);
    } catch (e) {
      return false;
    }
  }
  return true;
}

const FormSchema = z.object({
  address: z
    .string()
    .refine((address) => isBitcoinAddress(address), {
      message: "Invalid testnet BTC address",
    }),
});

type AccessTokenResponse = {
  access_token?: string;
  error?: string;
};

type UsernameResponse = {
  username?: string;
  avatar?: string;
  error?: string;
};

type Transaction = {
  recipientAddress: string;
  txHash: string;
  dateTime: string;
};

function App() {
  let [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({ username: "", avatar: "" });
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [redeemDetails, setRedeemDetails] = useState({
    tx: "",
    recipient_address: "",
    error: null,
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      address: "",
    },
  });

  const fetchBitcoin = useCallback(
    async (accessToken: String, address: String) => {
      const res = await fetch(`http://${URL}:3000/get-btc`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_token: accessToken,
          address,
        }),
      });
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();
      if (!data.error) {
        setRedeemDetails({
          tx: data.tx,
          recipient_address: data.recipient_address,
          error: null,
        });
      } else {
        setRedeemDetails({
          tx: "",
          recipient_address: "",
          error: data.error,
        });
      }
      console.log(data);
    },
    [URL],
  );

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const accessToken = getAccessToken();
    if (accessToken) {
      await fetchBitcoin(accessToken, data.address);
    }
  }

  function handleLogin() {
    window.location.assign(
      `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`,
    );
  }

  function getCode(): string | null {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get("code");
    return codeParam;
  }

  const getAccessToken = useCallback((): string | null => {
    return localStorage.getItem("access_token");
  }, []);

  const code = getCode();

  const fetchAccessToken = useCallback(async () => {
    const res = await fetch(`http://${URL}:3000/access-token/${code}`);
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data: AccessTokenResponse = await res.json();
    return data.access_token;
  }, [URL]);

  const fetchUserData = useCallback(
    async (accessToken: string) => {
      console.log(
        JSON.stringify({
          access_token: accessToken,
        }),
      );
      const usernameRes = await fetch(`http://${URL}:3000/username`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_token: accessToken,
        }),
      });

      const usernameJson = (await usernameRes.json()) as UsernameResponse;
      return { username: usernameJson.username, avatar: usernameJson.avatar };
    },
    [URL],
  );

  const fetchTransactions = useCallback(async () => {
    const res = await fetch(`http://${URL}:3000/transactions`);
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    console.log(data);

    let value = data.map((val: {datetime: string, tx: string, recipient_address: string}) => ({
      dateTime: val.datetime,
      txHash: val.tx,
      recipientAddress: val.recipient_address,
    }));
    return value;
  }, [URL]);

  useEffect(() => {
    async function fetchData() {
      try {
        const accessToken = getAccessToken();
        if (!code && !accessToken) return;
        setLoading(true);

        if (code && !accessToken) {
          const accessTokenFromResponse = await fetchAccessToken();
          if (accessTokenFromResponse) {
            localStorage.setItem("access_token", accessTokenFromResponse);
            const userData = await fetchUserData(accessTokenFromResponse);
            if (userData.username && userData.avatar) {
              setUserData({
                username: userData.username,
                avatar: userData.avatar,
              });
            }
          }
        }

        if ((!code && accessToken) || (code && accessToken)) {
          const userData = accessToken && (await fetchUserData(accessToken));
          if (userData && userData.username && userData.avatar) {
            setUserData({
              username: userData.username,
              avatar: userData.avatar,
            });
          }
        }
      } catch (e) {
        console.error("Failed to fetch access token:", e);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [code, getAccessToken]);

  useEffect(() => {
    async function fetch(){
    let transactions = await fetchTransactions();
    setTransactions(transactions);
    }

    fetch()
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <div className="flex justify-end pt-8 pr-16">
        {loading ? (
          <BeatLoader
            size={10}
            color={"black"}
            loading={loading}
            speedMultiplier={0.7}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : userData.username === "" ? (
          <Button className="font-bold" onClick={handleLogin}>
            Login with Github
          </Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage
                  src={userData.avatar}
                  alt={`@${userData.avatar}`}
                />
                <AvatarFallback>{userData.username.charAt(0)}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-54 mt-4 mr-4">
              <DropdownMenuLabel className="flex justify-center items-center">
                <LucideGithub className="mr-2 h-4 w-4" />{" "}
                <span>{userData.username}</span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="flex justify-center items-center"
                onClick={() => {
                  localStorage.clear();
                  setUserData({ username: "", avatar: "" });
                }}
              >
                <LogOut className="mr-2 h-4 w-4" /> <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      <div className="ml-20 mr-20">
        <p className="text-3xl font-bold mb-4">Faucet</p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6"
          >
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Wallet address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="BTC address"
                      {...field}
                      value={field.value}
                      onChange={(e) => {
                        // const newValue = e.target.value;
                        field.onChange(e);
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter your tesnet BTC address
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Get 0.01 BTC/WBTC</Button>
          </form>
        </Form>

        {redeemDetails.tx && redeemDetails.recipient_address ? (
          <Alert className="mt-6 w-1/3 min-w-max">
            <BitcoinIcon className="h-4 w-4" />
            <AlertTitle>Transaction Details</AlertTitle>
            <AlertDescription className="flex flex-col gap-1 mt-3">
              <div>
                <span className="text-muted-foreground">
                  Recipient Address{" "}
                </span>{" "}
                <span>{redeemDetails.recipient_address}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Tx Hash </span>{" "}
                <span>{redeemDetails.tx}</span>
              </div>
            </AlertDescription>
          </Alert>
        ) : (
          ""
        )}

        {redeemDetails.error ? (
          <Alert className="mt-6 w-1/3 min-w-max">
            <BitcoinIcon className="h-4 w-4" />
            <AlertTitle>Unable to post transaction</AlertTitle>
            <AlertDescription className="flex flex-col gap-1 mt-3">
              <div>
                <span>{redeemDetails.error}</span>
              </div>
            </AlertDescription>
          </Alert>
        ) : (
          ""
        )}

        <Table className="mt-6">
          <TableCaption>List of last 10 transactions</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Recipient Address</TableHead>
              <TableHead className="text-left">Tx Hash</TableHead>
              <TableHead className="text-left">Date Time (UTC)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.txHash}>
                <TableCell className="text-left">
                  {transaction.recipientAddress}
                </TableCell>
                <TableCell className="text-left">
                  {transaction.txHash}
                </TableCell>
                <TableCell className="text-left">
                  {transaction.dateTime}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default App;
