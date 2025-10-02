
'use client';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function ChatPage() {
    const managerAvatar = PlaceHolderImages.find(i => i.id === 'avatar-manager');
    const avatar1 = PlaceHolderImages.find(i => i.id === 'avatar-1');
    const avatar2 = PlaceHolderImages.find(i => i.id === 'avatar-2');
    const avatar3 = PlaceHolderImages.find(i => i.id === 'avatar-3');
    const avatar4 = PlaceHolderImages.find(i => i.id === 'avatar-4');
    const avatar5 = PlaceHolderImages.find(i => i.id === 'avatar-5');

  return (
    <div className="bg-background font-display text-foreground">
      <div className="flex h-screen w-full flex-col">
        <div className="flex flex-1 overflow-hidden">
          <aside className="flex w-80 flex-col border-r border-border bg-card">
            <div className="p-4">
              <h2 className="text-xl font-bold text-foreground">Chats</h2>
              <div className="relative mt-4">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  search
                </span>
                <input
                  className="w-full rounded-lg border-0 bg-background py-2.5 pl-10 pr-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Search chats"
                  type="text"
                />
              </div>
            </div>
            <nav className="flex-1 space-y-1 overflow-y-auto px-2 pb-4">
              <a
                className="flex items-center gap-3 rounded-lg bg-primary/10 px-3 py-3 text-primary"
                href="#"
              >
                <div className="relative h-12 w-12 shrink-0">
                  <div
                    className="h-full w-full rounded-full bg-cover bg-center"
                    style={{
                      backgroundImage:
                        `url("https://lh3.googleusercontent.com/aida-public/AB6AXuBuECpvgUOYds-ngkBYHdFIHkgyEbiKC-2TvnTks1qCKhNmo2E8qNkmS488Tqv3A8p4MOeZLyBRnB2EPupkQ-g9QkL1Hh4JuszJWe1CTZX8JN-A_5f4yAjWhetpk0Njn3GNh4L-Lb9sNRzeyzd_wAWO889nsFeqq624i0wP1WD_bHN21E2JE7WWry5G3nAxgngKj6pni_vhEzATp1RGbk6yUOsnDAdQ68VIHV_9myWnJVYwUvDxIQKKTvn3Iihoz4mIkrSqewEIvWQ")`,
                    }}
                  ></div>
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="font-semibold">Team Alpha</p>
                  <p className="truncate text-sm text-muted-foreground">
                    Last message: 2h ago
                  </p>
                </div>
              </a>
              <a
                className="flex items-center gap-3 rounded-lg px-3 py-3 hover:bg-muted"
                href="#"
              >
                <div
                  className="h-12 w-12 shrink-0 rounded-full bg-cover bg-center"
                  style={{
                    backgroundImage:
                      `url("https://lh3.googleusercontent.com/aida-public/AB6AXuBDohtpXToQMYDJtNZn1vAZGOXDS8QFpmbobyC_E-q35RlZl58uPOQc8sv2UNkq07Z28AJBW8FG6T5i19QZQuAtlVNd_AuFu9AzwAikwwKiG-x1QeDj13Z35uLYjR8H0ShuZExYVasPlYOi9Mr5TjdRaMg2SlSYxiMvUlU3HSFXg6VYVSFLV0qrQjigveGs0X9OnulNoTZBSDYEdjv10W688l98qsX5-TVGyutZQFC6P9LmXKRCtN5TiFtZwG4ILEyVVlSf0o7Bc94")`,
                  }}
                ></div>
                <div className="flex-1 overflow-hidden">
                  <p className="font-medium text-foreground">
                    Project X
                  </p>
                  <p className="truncate text-sm text-muted-foreground">
                    Last message: 1d ago
                  </p>
                </div>
              </a>
              <a
                className="flex items-center gap-3 rounded-lg px-3 py-3 hover:bg-muted"
                href="#"
              >
                <div
                  className="h-12 w-12 shrink-0 rounded-full bg-cover bg-center"
                  style={{
                    backgroundImage:
                      `url("${avatar1?.imageUrl || ''}")`,
                  }}
                ></div>
                <div className="flex-1 overflow-hidden">
                  <p className="font-medium text-foreground">
                    Sarah Chen
                  </p>
                  <p className="truncate text-sm text-muted-foreground">
                    Last message: 30m ago
                  </p>
                </div>
              </a>
              <a
                className="flex items-center gap-3 rounded-lg px-3 py-3 hover:bg-muted"
                href="#"
              >
                <div
                  className="h-12 w-12 shrink-0 rounded-full bg-cover bg-center"
                  style={{
                    backgroundImage:
                      `url("${avatar2?.imageUrl || ''}")`,
                  }}
                ></div>
                <div className="flex-1 overflow-hidden">
                  <p className="font-medium text-foreground">
                    Michael Lee
                  </p>
                  <p className="truncate text-sm text-muted-foreground">
                    Last message: 2d ago
                  </p>
                </div>
              </a>
              <a
                className="flex items-center gap-3 rounded-lg px-3 py-3 hover:bg-muted"
                href="#"
              >
                <div
                  className="h-12 w-12 shrink-0 rounded-full bg-cover bg-center"
                  style={{
                    backgroundImage:
                      `url("${avatar3?.imageUrl || ''}")`,
                  }}
                ></div>
                <div className="flex-1 overflow-hidden">
                  <p className="font-medium text-foreground">
                    HR Department
                  </p>
                  <p className="truncate text-sm text-muted-foreground">
                    Last message: 1w ago
                  </p>
                </div>
              </a>
              <a
                className="flex items-center gap-3 rounded-lg px-3 py-3 hover:bg-muted"
                href="#"
              >
                <div
                  className="h-12 w-12 shrink-0 rounded-full bg-cover bg-center"
                  style={{
                    backgroundImage:
                      `url("${avatar4?.imageUrl || ''}")`,
                  }}
                ></div>
                <div className="flex-1 overflow-hidden">
                  <p className="font-medium text-foreground">
                    David Kim
                  </p>
                  <p className="truncate text-sm text-muted-foreground">
                    Last message: 5m ago
                  </p>
                </div>
              </a>
            </nav>
          </aside>
          <main className="flex flex-1 flex-col">
            <div className="border-b border-border bg-card p-4">
              <h2 className="text-2xl font-bold text-foreground">
                Sarah Chen
              </h2>
              <p className="text-sm text-muted-foreground">Online</p>
            </div>
            <div className="flex-1 space-y-6 overflow-y-auto p-6">
              <div className="text-center text-sm text-muted-foreground">
                Today
              </div>
              <div className="flex items-end gap-3">
                <div
                  className="h-10 w-10 shrink-0 rounded-full bg-cover bg-center"
                  style={{
                    backgroundImage:
                      `url("${avatar1?.imageUrl || ''}")`,
                  }}
                ></div>
                <div className="max-w-md space-y-1">
                  <p className="text-sm font-medium text-foreground">
                    Sarah Chen
                  </p>
                  <div className="rounded-lg rounded-bl-none bg-muted p-3 text-foreground">
                    Hi there, I've reviewed the document you shared. It looks
                    great!
                  </div>
                </div>
              </div>
              <div className="flex flex-row-reverse items-end gap-3">
                <div
                  className="h-10 w-10 shrink-0 rounded-full bg-cover bg-center"
                  style={{
                    backgroundImage:
                      `url("${managerAvatar?.imageUrl || ''}")`,
                  }}
                ></div>
                <div className="max-w-md space-y-1">
                  <p className="text-right text-sm font-medium text-foreground">
                    You
                  </p>
                  <div className="rounded-lg rounded-br-none bg-primary p-3 text-primary-foreground">
                    Thanks, Sarah! I'm glad you like it. Any suggestions for
                    improvements?
                  </div>
                </div>
              </div>
              <div className="flex items-end gap-3">
                <div
                  className="h-10 w-10 shrink-0 rounded-full bg-cover bg-center"
                  style={{
                    backgroundImage:
                      `url("${avatar1?.imageUrl || ''}")`,
                  }}
                ></div>
                <div className="max-w-md space-y-1">
                  <p className="text-sm font-medium text-foreground">
                    Sarah Chen
                  </p>
                  <div className="rounded-lg rounded-bl-none bg-muted p-3 text-foreground">
                    Just a minor point on section 3. Could you elaborate on the
                    budget allocation?
                  </div>
                </div>
              </div>
              <div className="flex flex-row-reverse items-end gap-3">
                <div
                  className="h-10 w-10 shrink-0 rounded-full bg-cover bg-center"
                  style={{
                    backgroundImage:
                      `url("${managerAvatar?.imageUrl || ''}")`,
                  }}
                ></div>
                <div className="max-w-md space-y-1">
                  <p className="text-right text-sm font-medium text-foreground">
                    You
                  </p>
                  <div className="rounded-lg rounded-br-none bg-primary p-3 text-primary-foreground">
                    Sure, I'll add more details. I'll send you an updated
                    version by tomorrow.
                  </div>
                </div>
              </div>
              <div className="text-center text-sm text-muted-foreground">
                Yesterday
              </div>
              <div className="flex items-end gap-3">
                <div
                  className="h-10 w-10 shrink-0 rounded-full bg-cover bg-center"
                  style={{
                    backgroundImage:
                      `url("${avatar1?.imageUrl || ''}")`,
                  }}
                ></div>
                <div className="max-w-md space-y-1">
                  <p className="text-sm font-medium text-foreground">
                    Sarah Chen
                  </p>
                  <div className="rounded-lg rounded-bl-none bg-muted p-3 text-foreground">
                    Hi, can you share the latest project report with me?
                  </div>
                </div>
              </div>
              <div className="flex flex-row-reverse items-end gap-3">
                <div
                  className="h-10 w-10 shrink-0 rounded-full bg-cover bg-center"
                  style={{
                    backgroundImage:
                      `url("${managerAvatar?.imageUrl || ''}")`,
                  }}
                ></div>
                <div className="max-w-md space-y-2">
                  <p className="text-right text-sm font-medium text-foreground">
                    You
                  </p>
                  <div className="rounded-lg rounded-br-none bg-primary p-3 text-primary-foreground">
                    Yes, I'm attaching it here.
                  </div>
                  <div
                    className="aspect-video w-full max-w-sm rounded-lg bg-cover bg-center"
                    style={{
                      backgroundImage:
                        `url("${PlaceHolderImages.find(i => i.id === 'login-image')?.imageUrl || ''}")`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="border-t border-border bg-card p-4">
              <div className="relative flex items-center">
                <input
                  className="w-full rounded-full border-input bg-muted py-3 pl-5 pr-28 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Type a message"
                  type="text"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <button className="rounded-full p-2 text-muted-foreground hover:bg-muted/50">
                    <span className="material-symbols-outlined text-xl">
                      attach_file
                    </span>
                  </button>
                  <button className="rounded-full p-2 text-muted-foreground hover:bg-muted/50">
                    <span className="material-symbols-outlined text-xl">
                      image
                    </span>
                  </button>
                  <button className="ml-2 rounded-full bg-primary p-2 text-primary-foreground hover:bg-primary/90">
                    <span className="material-symbols-outlined"> send </span>
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
