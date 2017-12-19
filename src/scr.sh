# Rename all *.txt to *.text

for i in *.js
do
  j=`echo $i | sed 's/.js$/.jsx/'`
  # or, in this simple case even just: j=$"i"l
  mv $i $j
done
 

