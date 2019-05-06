export class ITicket {
  principal = '';
  ticket = '';
  redirectURL = '';
  roles = '';
}

export class ITicketWithName extends ITicket {
  screenUsername = '';
}
