
export default async function submitCommentaire(
  comment,
  setSendingState = () => { },
  _postCommentaire = () => { console.log('commentaire sent : ' + comment) },
) {
  setSendingState("currently_sending");
  let success = true;

  try {
    await _postCommentaire(comment);
  } catch (error) {
    console.log("error", error);
    success = false;
  }

  if (success) {
    setSendingState("ok_sent");
  } else {
    setSendingState("not_sent_because_of_errors");
  }
}
