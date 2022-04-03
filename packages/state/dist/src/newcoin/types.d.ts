export interface NetLimit {
    used: number;
    available: number;
    max: number;
}
export interface CpuLimit {
    used: number;
    available: number;
    max: number;
}
export interface Key {
    key: string;
    weight: number;
}
export interface RequiredAuth {
    threshold: number;
    keys: Key[];
    accounts: any[];
    waits: any[];
}
export interface Permission {
    perm_name: string;
    parent: string;
    required_auth: RequiredAuth;
}
export interface TotalResources {
    owner: string;
    net_weight: string;
    cpu_weight: string;
    ram_bytes: number;
}
export interface SubjectiveCpuBillLimit {
    used: number;
    available: number;
    max: number;
}
export interface Account {
    account_name: string;
    head_block_num: number;
    head_block_time: Date;
    privileged: boolean;
    last_code_update: Date;
    created: Date;
    core_liquid_balance: string;
    ram_quota: number;
    net_weight: number;
    cpu_weight: number;
    net_limit: NetLimit;
    cpu_limit: CpuLimit;
    ram_usage: number;
    permissions: Permission[];
    total_resources: TotalResources;
    self_delegated_bandwidth?: any;
    refund_request?: any;
    voter_info?: any;
    rex_info?: any;
    subjective_cpu_bill_limit: SubjectiveCpuBillLimit;
}
export interface Token {
    symbol: string;
    precision: number;
    amount: number;
    contract: string;
}
export interface Authorization {
    actor: string;
    permission: string;
}
export interface TokenIn {
    quantity: string;
    contract: string;
}
export interface TokenOut {
    quantity: string;
    contract: string;
}
export interface CreatorFee {
    quantity: string;
    contract: string;
}
export interface DaoFee {
    quantity: string;
    contract: string;
}
export interface StakeFee {
    quantity: string;
    contract: string;
}
export interface SchemaFormat {
    name: string;
    type: string;
}
export interface Data {
    pool_id: string;
    owner: string;
    token_in: TokenIn;
    token_out: TokenOut;
    creator_fee: CreatorFee;
    dao_fee: DaoFee;
    stake_fee: StakeFee;
    to: string;
    quantity: string;
    memo: string;
    from: string;
    amount?: number;
    symbol: string;
    description: string;
    authorized_creator: string;
    collection_name: string;
    schema_name: string;
    transferable?: boolean;
    burnable?: boolean;
    max_supply?: number;
    immutable_data: any[];
    schema_format: SchemaFormat[];
    author: string;
    allow_notify?: boolean;
    authorized_accounts: string[];
    notify_accounts: any[];
    market_fee?: number;
    data: any[];
}
export interface Act {
    account: string;
    name: string;
    authorization: Authorization[];
    data: Data;
}
export interface AccountRamDelta {
    account: string;
    delta: number;
}
export interface Action {
    "@timestamp": Date;
    timestamp: Date;
    block_num: number;
    trx_id: string;
    act: Act;
    notified: string[];
    global_sequence: number;
    producer: string;
    action_ordinal: number;
    creator_action_ordinal: number;
    cpu_usage_us?: number;
    net_usage_words?: number;
    account_ram_deltas: AccountRamDelta[];
    receiver: string;
}
export interface HyperionAccountHistory {
    query_time_ms: number;
    account: Account;
    links: any[];
    tokens: Token[];
    total_actions: number;
    actions: Action[];
}
//# sourceMappingURL=types.d.ts.map