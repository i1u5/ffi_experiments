enum USER32 {
    HWND_BROADCAST = 0xffff,
    WM_SYSCOMMAND = 0x0112,
    SC_MONITORPOWER = 0xf170,
    POWER_OFF = 0x0002,

    MOUSEEVENTF_MOVE = 0x0001,
}

const u32 = Deno.dlopen("user32.dll", {
    SendMessageW: {
        parameters: ["pointer", "u64", "pointer", "pointer"],
        result: "pointer",
    },
    mouse_event: {
        parameters: ["u32", "u32", "i32", "u32", "pointer"],
        result: "pointer",
    },
});

// TURN OFF
u32.symbols.SendMessageW(USER32.HWND_BROADCAST, USER32.WM_SYSCOMMAND, USER32.SC_MONITORPOWER, USER32.POWER_OFF);

// TURN ON
setTimeout(() => {
    u32.symbols.mouse_event(USER32.MOUSEEVENTF_MOVE, 0, 1, 0, null);
    u32.symbols.mouse_event(USER32.MOUSEEVENTF_MOVE, 0, -1, 0, null);
}, 5000);

u32.close();
